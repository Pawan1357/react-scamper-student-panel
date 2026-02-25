import { message } from 'antd';
import { NoticeType } from 'antd/es/message/interface';

import { setAxiosInterceptor } from 'services/interceptor';
import { authStore } from 'services/store/auth';

import { ICommonPagination } from './Types';
import { LocalStorageKeys } from './constants';
import { QUESTION_TYPE } from './constants/enum';

//To concate the path for the public folder
export const toAbsoluteUrl = (pathname: string) => window.location.origin + pathname;

// Rehydrate store and set axios default headers
export const setupAxios = () => {
  const { actions } = authStore.getState();

  const userStorage = localStorage.getItem(LocalStorageKeys.user);
  const tokenStorage = localStorage.getItem(LocalStorageKeys.authToken);

  if (userStorage && tokenStorage) {
    const token = JSON.parse(tokenStorage);
    const userData = JSON.parse(userStorage);

    if (token) {
      const USER_DATA = { ...userData, authToken: token };
      actions.authSuccess({ data: USER_DATA });
    } else {
      actions.authFail();
    }
  }

  // Set Axios Interceptor
  setAxiosInterceptor();
};

export const appLoader = (status: boolean) => {
  const { actions } = authStore.getState();
  actions.loaderChange(status);
};

/**
 * Convert a hex color to an rgba string with specified opacity
 *
 * @param hex - The hex color string, e.g. "#4B88FF" or "#4B8"
 * @param opacity - The opacity as a number between 0 (transparent) and 1 (fully opaque)
 * @returns A string in rgba format, e.g. "rgba(75, 136, 255, 0.5)"
 */
export function hexToRGBA(hex: string, opacity: number): string {
  let cleanedHex = hex.replace('#', '');

  if (cleanedHex.length === 3) {
    cleanedHex = cleanedHex
      .split('')
      .map((c) => c + c)
      .join('');
  }

  if (cleanedHex.length !== 6) {
    throw new Error('Invalid hex color format');
  }

  const r = parseInt(cleanedHex.substring(0, 2), 16);
  const g = parseInt(cleanedHex.substring(2, 4), 16);
  const b = parseInt(cleanedHex.substring(4, 6), 16);

  return `rgba(${r}, ${g}, ${b}, ${opacity})`;
}

export const showToaster = (type: NoticeType, content: React.ReactNode): void => {
  const fallback = 'An unexpected error occurred';

  if (Array.isArray(content)) {
    content.forEach((msg) => {
      message[type](msg);
    });
  } else {
    message[type](content || fallback);
  }
};

export const getInitials = (first_name: string, last_name: string, full_name?: string) => {
  const initial = full_name
    ? full_name
        .split(' ')
        .map((name) => name[0])
        .join('')
    : '';
  return first_name && last_name
    ? `${first_name?.[0] || ''}${last_name?.[0] || ''}`
    : initial || first_name?.[0] || '';
};

export const capitalizeFirstLetterWhileTyping = (value: string) => {
  if (!value) return '';
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const buildSearchParams = (options: ICommonPagination): URLSearchParams => {
  const params = new URLSearchParams();

  if (options.page) params.set('page', String(options.page));
  if (options.limit) params.set('limit', String(options.limit));
  if (options.search?.trim()) params.set('search', options.search.trim());
  if (options.sort_by) params.set('sort_by', options.sort_by);
  if (options.sort_order) params.set('sort_order', options.sort_order);

  return params;
};

export function debounce<T>(this: T, func: (...args: any[]) => void): (...args: any[]) => void {
  let timer: ReturnType<typeof setTimeout> | null = null;
  return function (this: T, ...args: any[]): void {
    clearTimeout(timer as NodeJS.Timeout);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, 700);
  };
}

export const getSortOrder = (order: string | null | undefined): string | null => {
  switch (order) {
    case 'descend':
      return 'DESC';
    case 'ascend':
      return 'ASC';
    default:
      return '';
  }
};

export const getAntDSortOrder = (
  currentSortBy: string | undefined,
  currentSortOrder: string | undefined,
  columnKey: string
): 'ascend' | 'descend' | undefined => {
  if (currentSortBy !== columnKey) return undefined;
  const order = currentSortOrder?.toLowerCase();
  if (order === 'asc') return 'ascend';
  if (order === 'desc') return 'descend';
  return undefined;
};

export const formatPhoneDynamic = (num?: string) => {
  if (!num) return '-';

  // Example input: "+1 1234567890" or "+61 1234567890"
  const parts = num.trim().split(' ');

  if (parts.length !== 2) return num;

  const countryCode = parts[0]; // +1 or +61
  const digits = parts[1].replace(/\D/g, ''); // remove spaces or dashes

  // Format only US (+1) numbers as (123) 456-7890
  if (countryCode === '+1' && digits.length === 10) {
    const area = digits.slice(0, 3);
    const mid = digits.slice(3, 6);
    const last = digits.slice(6);
    return `${countryCode} (${area}) ${mid}-${last}`;
  }

  // For all other countries return as "+61 1234567890"
  return `${countryCode} ${digits}`;
};

export const formatFileSize = (bytes: number | null | undefined): string => {
  if (bytes && bytes > 0) {
    if (bytes < 1024) return `${bytes} B`;
    const kb = bytes / 1024;
    if (kb < 1024) return `${kb.toFixed(2)} KB`;
    const mb = kb / 1024;
    if (mb < 1024) return `${mb.toFixed(2)} MB`;
    const gb = mb / 1024;
    return `${gb.toFixed(2)} GB`;
  }
  return '-';
};

export const questionType = (type: string): string => {
  switch (type) {
    case QUESTION_TYPE.MCQ:
      return 'MCQ';
    case QUESTION_TYPE.MATCH_PAIR:
      return 'Pair';
    case QUESTION_TYPE.DRAG_AND_DROP:
      return 'Drag & Drop';
    default:
      return '-';
  }
};

export const capitalizeFirst = (word: string = '') =>
  word?.trim() ? word.charAt(0).toUpperCase() + word.slice(1) : null;
