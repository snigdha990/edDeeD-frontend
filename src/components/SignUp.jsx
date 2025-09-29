import { SignUp } from '@clerk/clerk-react';

export default function SignUp() {
  return (
    <div className="auth-container">
      <SignUp path="/sign-up" routing="path" />
    </div>
  );
}
