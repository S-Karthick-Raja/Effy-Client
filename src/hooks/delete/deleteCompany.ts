/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { backend } from '../../utils/axiosInstants';
import { deleteCompany } from '../../config/url';

export const useDeleteCompanyMutation = (): any => {
    const navigate = useNavigate();
    const deleteCompanyMutation = useMutation(
        async (RequestData: any) => {
            return await backend({
                url: `${deleteCompany}/${RequestData.id}`,
                method: 'DELETE',
            });
        },
        {
            onError: (errors: any) => {
                toast.error(errors.response.data.error);
            },
            onSuccess: (response: any) => {
                if (response.status === 204) {
                    toast.success('Company delete successfully');
                    navigate(0);
                }

            },
        }
    );
    return { deleteCompanyMutation };
};
