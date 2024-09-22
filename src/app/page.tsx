'use client'
import Onboarding from "./components/Onboarding";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function HomePage() {
  return (
    <main>
      <Onboarding/>
      <ToastContainer position="bottom-center" hideProgressBar/>
    </main>
  );
}
