import 'styled-components';
import { defaultTheme } from '../styles/themes/default';

type ThemeType = typeof defaultTheme;

// Criando uma tipagem para o module styled-components
declare module 'styled-components' {
    export interface DefaultTheme extends ThemeType {}
}

