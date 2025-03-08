import {setupServer} from 'msw/node';
import {it, beforeAll, afterEach, afterAll, expect} from 'vitest';
import {render, screen, fireEvent} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Login from '../login.jsx';
import {http, HttpResponse} from 'msw';
const URL = 'http://localhost:3010/api/v0/login';

const server = setupServer();

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

it('Accepts Good Credentials', async () => {
  server.use(
      http.post(URL, async () => {
        return HttpResponse.json(
            {name: 'Molly Member', accessToken: 'someToken'}, {status: 200});
      }),
  );
  render(<Login />);
  const email = screen.getByPlaceholderText('EMail');
  expect(email).toBeTruthy();
  await userEvent.type(email, 'foo@bar.com');
  const passwd = screen.getByPlaceholderText('Password');
  expect(passwd).toBeTruthy();
  await userEvent.type(passwd, 'secret');
  fireEvent.click(screen.getByText('Login'));
  expect(await screen.findByText('Molly Member')).toBeInTheDocument();
});
