import axios from 'axios';
import applyConveter from 'axios-case-converter';
import MockAdapter from 'axios-mock-adapter';

const responseInterceptor = (response: any) => response.data;
const responseErrorInterceptor = error => Promise.reject(error);

const client = applyConveter(axios.create());
client.interceptors.response.use(responseInterceptor, responseErrorInterceptor);
//const mock = new MockAdapter(client);

//mock.onPost('/test').reply(200, [{ test_test: 'foo', check: 'bar' }]);

describe('Axios converter', () => {
  it('should convert array response', async () => {
    try {
      const response = await client.post('https://apidev.tovarbezpereplat.ru/api/v1/users/login', {
        phone: '123',
        password: '123'
      });
      expect(response).toEqual([{ testTest: 'foo', check: 'bar' }]);
    } catch (err) {
      console.log(err.response.data);
    }
  });
});
