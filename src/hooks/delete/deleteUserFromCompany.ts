/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { backend } from '../../utils/axiosInstants';
import { removeUserFromCompany } from '../../config/url';

export const useRemoveUserMutation = (): any => {
    const navigate = useNavigate();
    const removeUserFromCompanyMutation = useMutation(
        async (RequestData: any) => {
            return await backend({
                url: `${removeUserFromCompany}`,
                method: 'DELETE',
                data: RequestData
            });
        },
        {
            onError: (errors: any) => {
                toast.error(errors.response.data.error);
            },
            onSuccess: (response: any) => {
                if (response.status === 204) {
                    toast.success('Removed user successfully');
                    navigate(0);
                }

            },
        }
    );
    return { removeUserFromCompanyMutation };
};
