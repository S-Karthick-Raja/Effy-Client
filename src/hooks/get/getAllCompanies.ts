import { useMutation } from '@tanstack/react-query';
import { backend } from '../../utils/axiosInstants';
import { useAtom } from 'jotai';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingState } from '../../jotai/companies';
import { getAllCompany } from '../../config/url';

export const useGetCompanyMutation = (): any => {

    const [loading, setLoading] = useAtom(LoadingState);
    const [company, setCompany] = useState([]);

    const getAllCompanyMutation = useMutation(
        async () => {
            setLoading(true);
            return await backend({ url: `${getAllCompany}`, method: 'GET' });
        },
        {
            onError: (error: any) => {
                toast.error(error.response.data.error.message);
                setLoading(false);
            },
            onSuccess: (response: any) => {
                toast.success(response.data.message)
                setCompany(
                    response.data.data
                );
                setLoading(false);
            },
        }
    );
    return { getAllCompanyMutation, company, loading };
};
