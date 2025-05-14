import React from 'react';

export default function HomePage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f0f0'
      }}
    >
      <h1 style={{ color: '#333' }}>欢迎来到主页</h1>
    </div>
  );
}