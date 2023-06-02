/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { backend } from '../../utils/axiosInstants';
import { useAtom } from 'jotai';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingState } from '../../jotai/companies';
import { getAllUsers } from '../../config/url';
import { useLocation } from 'react-router-dom';

export const useGetExistUserMutation = (): any => {

    const location = useLocation();

    const [loading, setLoading] = useAtom(LoadingState);
    const [user, setUser] = useState([]);

    const getAllExistUserMutation = useMutation(
        async () => {
            setLoading(true);
            return await backend({ url: `${getAllUsers}`, method: 'GET' });
        },
        {
            onError: (error: any) => {

                if (error.response.data.error === 'No company found') {
                    toast(error.response.data.error)

                } else {
                    toast.error(error.response.data.error)

                }
                setLoading(false);
            },
            onSuccess: (response: any) => {
                { location.pathname === '/companies' && toast.success(response.data.message) }

                setUser(response.data.data.map((value: any) => ({
                    value: `${value.firstName} ${value.lastName}`,
                    label: `${value.firstName} ${value.lastName}`,
                    id: value.id,
                })));
                // setCompany(
                //     response.data.data
                // );
                setLoading(false);
            },
        }
    );
    return { getAllExistUserMutation, user, loading };
};
