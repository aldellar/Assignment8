import {setupServer} from 'msw/node';
import {it, beforeAll, afterEach, afterAll, expect} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import {http, HttpResponse} from 'msw';
const URL = 'http://localhost:3010/api/v0/login';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('Renders Basic Login Components', async () => {
  render(<App />);
  expect(screen.getByLabelText('email')).toBeTruthy();
  expect(screen.getByLabelText('password')).toBeTruthy();
});
it('Accepts Good Credentials', async () => {
  server.use(
      http.post(URL, async () => {
        return HttpResponse.json(
            {name: 'Molly Member', accessToken: 'someToken'}, {status: 200});
      }),
  );
  render(<App />);
  const email = screen.getByPlaceholderText('EMail');
  expect(email).toBeTruthy();
  await userEvent.type(email, 'molly@books.com');
  const passwd = screen.getByPlaceholderText('Password');
  expect(passwd).toBeTruthy();
  await userEvent.type(passwd, 'mollymember');
  fireEvent.click(screen.getByLabelText('login'));
  expect(await screen.findByText('Home Page')).toBeInTheDocument();
  expect(await screen.findByText('Logout')).toBeInTheDocument();
  expect(await screen.findByText('Auth Token: someToken')).toBeInTheDocument();
});
