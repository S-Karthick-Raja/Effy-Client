/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { backend } from '../../utils/axiosInstants';
import { deleteUser } from '../../config/url';

export const useDeleteUserMutation = (): any => {
    const navigate = useNavigate();
    const deleteUserMutation = useMutation(
        async (RequestData: any) => {
            return await backend({
                url: `${deleteUser}/${RequestData.id}`,
                method: 'DELETE',
            });
        },
        {
            onError: (errors: any) => {
                toast.error(errors.response.data.error);
            },
            onSuccess: (response: any) => {
                if (response.status === 204) {
                    toast.success('User delete successfully');
                    navigate('/users');
                }

            },
        }
    );
    return { deleteUserMutation };
};
