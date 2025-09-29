import { SignIn } from '@clerk/clerk-react';

export default function SignIn() {
  return (
    <div className="auth-container">
      <SignIn path="/sign-in" routing="path" />
    </div>
  );
}
