/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { MoodProvider } from './hooks/useMood';
import MainLayout from './components/MainLayout';

export default function App() {
  return (
    <MoodProvider>
      <MainLayout />
    </MoodProvider>
  );
}
