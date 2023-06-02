/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { backend } from '../../utils/axiosInstants';
import { useAtom } from 'jotai';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingState } from '../../jotai/companies';
import { getUniqueUser } from '../../config/url';
import { useParams } from 'react-router-dom';

export const useGetUniqueUserMutation = (): any => {

    const [loading, setLoading] = useAtom(LoadingState);
    const [user, setUser] = useState([]);

    const params = useParams()

    const getUniqueUserMutation = useMutation(
        async () => {
            setLoading(true);
            return await backend({ url: `${getUniqueUser}/${params.id}`, method: 'GET' });
        },
        {
            onError: (error: any) => {
                toast.error(error.response.data.error.message);
                setLoading(false);
            },
            onSuccess: (response: any) => {
                toast.success(response.data.message)
                setUser(
                    response.data.data
                );
                setLoading(false);
            },
        }
    );
    return { getUniqueUserMutation, user, loading };
};
