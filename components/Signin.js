import React from 'react';
import { Button } from 'react-bootstrap';
import Image from 'next/image';
import { signIn } from '../utils/auth';

export default function Signin() {
  return (
    <div
      className="text-center d-flex justify-content-center align-items-center"
      style={{
        height: '100vh',
        padding: '30px',
        margin: '0 auto',
        minHeight: '25rem',
        width: '100%',
        minWidth: '30rem',
        paddingBlock: '0 5rem',
        backgroundColor: '#FFF5EA',
      }}
    >
      <div className="sign-in-div">
        <h1>Welcome to Zues&apos; Garden!</h1>
        <div>
          <Image src="/apple-tree.png" width="50px" height="50px" />
        </div>
        <Button type="button" variant="success" size="lg" className="copy-btn" onClick={signIn}>
          Sign In
        </Button>
      </div>
    </div>
  );
}
