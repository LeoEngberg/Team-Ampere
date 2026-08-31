import {describe, it, expect, vi, beforeEach} from 'vitest';
import {useUserStore} from './user.js';
import {createPinia, setActivePinia} from 'pinia';
import * as api from '../services/api.js';

describe('User Store', () => {
    beforeEach (() =>{
        setActivePinia(createPinia());
    })
    // Test case for setting user data
    it('should set user data correctly after load', async () => {

        const userData = { id: 1, name: 'John Doe' };
        vi.spyOn(api, 'fetchUser').mockResolvedValue(userData);
        //vi.spyOn() is a Vitest function used to track, inspect, 
        // or temporarily override the behavior of an existing method on an object without completely recreating the object.

        const userStore = useUserStore();
        await userStore.load();

        expect(userStore.user).toEqual(userData);
    });
});
  