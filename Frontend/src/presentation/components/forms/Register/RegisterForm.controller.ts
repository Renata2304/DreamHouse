import { useCallback } from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { useIntl } from "react-intl";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";

import { useRegister } from "@infrastructure/apis/api-management";
import { useAppRouter } from "@infrastructure/hooks/useAppRouter";
import { useAppDispatch } from "@application/store";
import { setToken } from "@application/state-slices";
import { RegisterFormModel, RegisterFormController } from "./RegisterForm.types";

const getDefaultValues = (): RegisterFormModel => ({
    email: "",
    password: "",
    confirmPassword: "",
});

const useInitRegisterForm = () => {
    const { formatMessage } = useIntl();
    const defaultValues = getDefaultValues();

    const schema = yup.object({
        email: yup
            .string()
            .email(formatMessage({ id: "globals.validations.invalidEmail" }))
            .required(
                formatMessage({ id: "globals.validations.requiredField" }, {
                    fieldName: formatMessage({ id: "globals.email" }),
                })
            ),
        password: yup
            .string()
            .min(6, formatMessage({ id: "globals.validations.passwordMin" }))
            .required(
                formatMessage({ id: "globals.validations.requiredField" }, {
                    fieldName: formatMessage({ id: "globals.password" }),
                })
            ),
        confirmPassword: yup
            .string()
            .oneOf(
                [yup.ref("password")],
                formatMessage({ id: "globals.validations.passwordMatch" })
            )
            .required(
                formatMessage({ id: "globals.validations.requiredField" }, {
                    fieldName: formatMessage({ id: "globals.confirmPassword" }),
                })
            ),
    });

    return {
        defaultValues,
        resolver: yupResolver(schema),
    };
};

export const useRegisterFormController = (): RegisterFormController => {
    const { formatMessage } = useIntl();
    const { defaultValues, resolver } = useInitRegisterForm();
    const { redirectToHome } = useAppRouter();
    const { mutateAsync: registerUser, status } = useRegister();
    const dispatch = useAppDispatch();
    const queryClient = useQueryClient();

    const submit = useCallback(
        async (data: RegisterFormModel) => {
            try {
                const result = await registerUser({
                    email: data.email,
                    password: data.password,
                    confirmPassword: data.confirmPassword,
                });

                dispatch(setToken(result.response?.token ?? ""));
                toast.success(formatMessage({ id: "notifications.messages.registrationSuccess" }));
                redirectToHome();
            } catch (error) {
                toast.error(formatMessage({ id: "notifications.messages.registrationError" }));
            }
        },
        [registerUser, dispatch, redirectToHome, formatMessage]
    );

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<RegisterFormModel>({
        defaultValues,
        resolver,
    });

    return {
        actions: {
            handleSubmit,
            submit,
            register,
        },
        computed: {
            defaultValues,
            isSubmitting: status === "pending",
        },
        state: {
            errors,
        },
    };
};
