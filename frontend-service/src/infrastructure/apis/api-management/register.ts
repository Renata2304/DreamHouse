import { RegisterDTO } from "../client/models";
import { AuthorizationApi } from "../client/apis";
import { useMutation } from "@tanstack/react-query";

/**
 * Use constants to identify mutations and queries.
 */
const registerMutationKey = "registerMutation";

/**
 * Hook to register a new user using the generated API client.
 */
export const useRegister = () => {
    return useMutation({
        mutationKey: [registerMutationKey],
        mutationFn: (registerDTO: RegisterDTO) =>
            new AuthorizationApi().apiAuthorizationRegisterPost({ registerDTO })
    });
};
