/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { backend } from '../../utils/axiosInstants';
import { useAtom } from 'jotai';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingState } from '../../jotai/companies';
import { getAllUserFromCompany } from '../../config/url';
import { useParams } from 'react-router-dom';

export const GetUsersFromCompanyMutation = (): any => {

    const [loading, setLoading] = useAtom(LoadingState);
    const [users, setUsers] = useState([]);

    const params = useParams()

    const getAllUsersFromCompanyMutation = useMutation(
        async () => {
            setLoading(true);
            return await backend({ url: `${getAllUserFromCompany}/${params.id}`, method: 'GET' });
        },
        {
            onError: (error: any) => {
                toast.error(error.response.data.error.message);
                setLoading(false);
            },
            onSuccess: (response: any) => {
                toast.success(response.data.message)

                console.log(response.data.data)


                setUsers(response.data.data?.map((value: any) => ({
                    value: `${value.user.firstName} ${value.user.lastName}`,
                    label: `${value.user.firstName} ${value.user.lastName}`,
                    id: value.user.id,
                })));
                setLoading(false);

            },
        }
    );
    return { getAllUsersFromCompanyMutation, users, loading };
};
