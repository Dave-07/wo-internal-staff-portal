import styled from "styled-components";
import supabase from "../services/supabase";
import { useEffect, useState } from "react";

const LoginLayout = styled.main`
  min-height: 100vh;
  display: grid;
  grid-template-columns: 48rem;
  max-width: 100%;
  align-content: center;
  justify-content: center;
  gap: 3.2rem;
  background-color: var(--color-grey-50, #f9fafb);
  padding: 3.2rem 2.4rem;

  @media (max-width: 500px) {
    grid-template-columns: 100%;
  }
`;

const Card = styled.div`
  background-color: var(--color-grey-0, #ffffff);
  border: 1px solid var(--color-grey-100, #f3f4f6);
  border-radius: var(--border-radius-md, 8px);
  padding: 3.2rem 4rem;
  box-shadow: var(--shadow-md, 0 4px 6px -1px rgba(0, 0, 0, 0.1));
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.6rem;
`;

const Title = styled.h2`
  font-size: 2rem;
  font-weight: 600;
  text-align: center;
  color: var(--color-grey-800, #1f2937);
  margin-bottom: 0.8rem;
`;

const LoggedInView = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  text-align: center;
`;

const StatusText = styled.p`
  font-size: 1.6rem;
  color: var(--color-grey-700, #374151);

  strong {
    color: var(--color-brand-600, #4f46e5);
  }
`;

const Input = styled.input`
  border: 1px solid var(--color-grey-300, #d1d5db);
  background-color: var(--color-grey-0, #ffffff);
  border-radius: var(--border-radius-sm, 5px);
  padding: 0.8rem 1.2rem;
  font-size: 1.4rem;
  box-shadow: var(--shadow-sm, 0 1px 2px rgba(0, 0, 0, 0.05));

  &:focus {
    outline: none;
    border-color: var(--color-brand-600, #4f46e5);
    box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.15);
  }
`;

const Button = styled.button`
  background-color: var(--color-brand-600, #4f46e5);
  color: #ffffff;
  border: none;
  border-radius: var(--border-radius-sm, 5px);
  padding: 1rem 1.6rem;
  font-size: 1.4rem;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;

  &:hover {
    background-color: var(--color-brand-700, #4338ca);
  }
`;

const ButtonSecondary = styled(Button)`
  background-color: transparent;
  color: var(--color-grey-600, #4b5563);
  border: 1px solid var(--color-grey-300, #d1d5db);

  &:hover {
    background-color: var(--color-grey-50, #f9fafb);
    color: var(--color-grey-800, #1f2937);
  }
`;

const Message = styled.p`
  font-size: 1.4rem;
  text-align: center;
  color: var(--color-brand-600, #4f46e5);
  font-weight: 500;
`;

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [session, setSession] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function handleLogin(e) {
    e.preventDefault();
    setMessage("");

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      setMessage(`Login failed: ${error.message}`);
    } else {
      setMessage("Successfully logged in!");
      setEmail("");
      setPassword("");
    }
  }

  async function handleLogout() {
    setMessage("");
    const { error } = await supabase.auth.signOut();

    if (error) {
      setMessage(`Logout failed: ${error.message}`);
    } else {
      setMessage("Successfully logged out!");
    }
  }

  return (
    <LoginLayout>
      <Card>
        {session ? (
          // log in
          <LoggedInView>
            <StatusText>
              Logged in as: <strong>{session.user.email}</strong>
            </StatusText>
            <ButtonSecondary type="button" onClick={handleLogout}>
              Log out
            </ButtonSecondary>
          </LoggedInView>
        ) : (
          // log out
          <Form onSubmit={handleLogin}>
            <Title>Log in to your account</Title>
            <Input
              type="email"
              placeholder="Email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit">Log in</Button>
          </Form>
        )}

        {message && <Message>{message}</Message>}
      </Card>
    </LoginLayout>
  );
}
