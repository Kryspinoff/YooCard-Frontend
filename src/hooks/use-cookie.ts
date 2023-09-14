import { useState } from 'react';

function useCookie(cookieName: string): [string | null, (value: string, days?: number) => void] {
    const getCookie = (): string | null => {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${cookieName}=`);
        if (parts.length === 2) return parts.pop()!.split(';').shift() || null;
        return null;
    };

    const [cookie, setCookieState] = useState<string | null>(getCookie());

    const setCookie = (value: string, days = 365) => {
        const date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        const expires = `; expires=${date.toUTCString()}`;
        document.cookie = `${cookieName}=${value}${expires}; path=/`;
        setCookieState(value);
    };

    return [cookie, setCookie];
}

export default useCookie;