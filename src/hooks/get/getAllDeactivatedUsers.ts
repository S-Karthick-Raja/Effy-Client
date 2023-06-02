/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { backend } from '../../utils/axiosInstants';
import { useAtom } from 'jotai';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingState } from '../../jotai/companies';
import { getAllDeactivatedUsers } from '../../config/url';

export const useGetAllDeactivUsersMutation = (): any => {

    const [loading, setLoading] = useAtom(LoadingState);
    const [users, setusers] = useState([]);

    const getAllDeactivatedUsersMutation = useMutation(
        async () => {
            setLoading(true);
            return await backend({ url: `${getAllDeactivatedUsers}`, method: 'GET' });
        },
        {
            onError: (error: any) => {
                if (error.response.data.error === 'No users found') {
                    toast(error.response.data.error)

                } else {
                    toast.error(error.response.data.error)

                }
                setLoading(false);
            },
            onSuccess: (response: any) => {
                setusers(
                    response.data.data
                );
                setLoading(false);
            },
        }
    );
    return { getAllDeactivatedUsersMutation, users, loading };
};
