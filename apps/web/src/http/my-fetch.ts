import { HTTPError, type Options } from 'ky';
import { api } from './api';

type Success<T> = {
  data: T;
  error: null;
};

type Failure<E> = {
  data: null;
  error: E | HTTPError;
};

type Result<T, E = Error> = Success<T> | Failure<E>;

export default async function myFetch<T, E = Error>(
  url: string,
  options: Options = {}
): Promise<Result<T, E>> {
  try {
    const data = await api(url, options).json<T>();

    return {
      data,
      error: null,
    };
  } catch (error) {
    if (error instanceof HTTPError) {
      return {
        data: null,
        error: error as HTTPError,
      };
    }

    return {
      data: null,
      error: error as E,
    };
  }
}
