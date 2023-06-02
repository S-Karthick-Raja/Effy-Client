/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMutation } from '@tanstack/react-query';
import { backend } from '../../utils/axiosInstants';
import { useAtom } from 'jotai';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { LoadingState } from '../../jotai/companies';
import { fetchDesignationList } from '../../config/url';
import { useLocation } from 'react-router-dom';

export const useFetchDesignationMutation = (): any => {

    const location = useLocation();

    const [loading, setLoading] = useAtom(LoadingState);
    const [designation, setDesignation] = useState([]);

    const fetchAllDesignationMutation = useMutation(
        async () => {
            setLoading(true);
            return await backend({ url: `${fetchDesignationList}`, method: 'GET' });
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

                setDesignation(response.data.data.map((value: any) => ({
                    value: value.title,
                    label: value.title,
                    id: value.id,
                })));
                // setDesignation(
                //     response.data.data
                // );
                setLoading(false);
            },
        }
    );
    return { fetchAllDesignationMutation, designation, loading };
};
