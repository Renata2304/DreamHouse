import {
    Button,
    CircularProgress,
    FormControl,
    FormHelperText,
    FormLabel,
    Stack,
    OutlinedInput,
} from "@mui/material";
import { FormattedMessage, useIntl } from "react-intl";
import { isEmpty, isUndefined } from "lodash";

import { useRegisterFormController } from "./RegisterForm.controller";
import { ContentCard } from "@presentation/components/ui/ContentCard";

/**
 * Here we declare the register form component.
 */
export const RegisterForm = () => {
  const { formatMessage } = useIntl();
  const { state, actions, computed } = useRegisterFormController();

  return (
    <form className="min-w-[400px]" onSubmit={actions.handleSubmit(actions.submit)}>
      <Stack spacing={4}>
        <ContentCard title={formatMessage({ id: "globals.register" })}>
          <div className="grid grid-cols-2 gap-y-5 gap-x-5">
            {/* Email */}
            <div className="col-span-2">
              <FormControl fullWidth error={!isUndefined(state.errors.email)}>
                <FormLabel required>
                  <FormattedMessage id="globals.email" />
                </FormLabel>
                <OutlinedInput
                  {...actions.register("email")}
                  placeholder={formatMessage({ id: "globals.placeholders.textInput" }, { fieldName: formatMessage({ id: "globals.email" }) })}
                  autoComplete="email"
                />
                <FormHelperText hidden={isUndefined(state.errors.email)}>
                  {state.errors.email?.message}
                </FormHelperText>
              </FormControl>
            </div>

            {/* Password */}
            <div className="col-span-2">
              <FormControl fullWidth error={!isUndefined(state.errors.password)}>
                <FormLabel required>
                  <FormattedMessage id="globals.password" />
                </FormLabel>
                <OutlinedInput
                  type="password"
                  {...actions.register("password")}
                  placeholder={formatMessage({ id: "globals.placeholders.textInput" }, { fieldName: formatMessage({ id: "globals.password" }) })}
                  autoComplete="new-password"
                />
                <FormHelperText hidden={isUndefined(state.errors.password)}>
                  {state.errors.password?.message}
                </FormHelperText>
              </FormControl>
            </div>

            {/* Confirm Password */}
            <div className="col-span-2">
              <FormControl fullWidth error={!isUndefined(state.errors.confirmPassword)}>
                <FormLabel required>
                  <FormattedMessage id="globals.confirmPassword" />
                </FormLabel>
                <OutlinedInput
                  type="password"
                  {...actions.register("confirmPassword")}
                  placeholder={formatMessage({ id: "globals.placeholders.textInput" }, { fieldName: formatMessage({ id: "globals.confirmPassword" }) })}
                  autoComplete="new-password"
                />
                <FormHelperText hidden={isUndefined(state.errors.confirmPassword)}>
                  {state.errors.confirmPassword?.message}
                </FormHelperText>
              </FormControl>
            </div>

            {/* Submit Button */}
            <Button className="-col-end-1 col-span-1" type="submit" disabled={!isEmpty(state.errors) || computed.isSubmitting}>
              {!computed.isSubmitting && <FormattedMessage id="globals.register" />}
              {computed.isSubmitting && <CircularProgress />}
            </Button>
          </div>
        </ContentCard>
      </Stack>
    </form>
  );
};
