import { createGlobalStyle } from "styled-components";
const GlobalStyle = createGlobalStyle`
:root {
.react-switch-bg {
    border-radius: 0px !important;
}
.react-switch-handle {
    border-radius: 0px !important;
}
   

.dx-datagrid-headers {
  background-color: #ececec !important; /* Make sure the background color fills the header */
}

.dx-datagrid-headers .dx-header-row{
  background-color: #ececec !important;
}
  
.dx-datagrid-headers .dx-header-row{
  text-align: center;
  font-weight: bold;
}
  
.dx-widget input, .dx-widget textarea {
    font-family: "Rubik", serif !important; 
    line-height: 1.35715;
}

.dx-datagrid-headers .dx-header-cell {
  padding: 7px;
  text-align: center; font-weight: bold;
}
 ///swal
.swal-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  border: 1px solid #d5d5d5;
}

.swal-table th, .swal-table td {
  border: 1px solid #d5d5d5;
  padding: 8px;
  text-align: center;
}

.swal-table th {
  background-color: #f2f2f2;
  font-weight: bold;
}

input[type="number"]::-webkit-outer-spin-button,
input[type="number"]::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Hide input spinner for Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}

/* Hide input spinner for Edge */
input[type="number"]::-ms-clear {
  display: none;
}
  
  --fc-border-color: var(--color-grey-200);
  &, &.light-mode{
         /* Indigo */
        --color-brand-50: #eef2ff;
        --color-brand-100: #e0e7ff;
        --color-brand-200: #c7d2fe;
        --color-brand-500: #6366f1;
        --color-brand-600: #4f46e5;
        --color-brand-700: #4338ca;
        --color-brand-800: #3730a3;
        --color-brand-900: #312e81;

        /* Grey */
        --color-grey-0: #fff;
        --color-grey-50: #f9fafb;
        --color-grey-100: #f3f4f6;
        --color-grey-200: #e5e7eb;
        --color-grey-300: #d1d5db;
        --color-grey-400: #9ca3af;
        --color-grey-500: #6b7280;
        --color-grey-600: #4b5563;
        --color-grey-700: #374151;
        --color-grey-800: #1f2937;
        --color-grey-900: #111827;

        --color-blue-100: #e0f2fe;
        --color-blue-700: #0369a1;
        --color-green-100: #dcfce7;
        --color-green-700: #15803d;
        --color-green-soft: #3faba4;
        --color-green-soft-700:rgb(23, 126, 119);
        --color-green-sharp: #2ab4c0;
        --color-green-sharp-700:rgb(22, 134, 145);

        --color-purple-sharp: #796799;
        --color-purple-sharp-700: #4e347a;

        --color-yellow-100: #fef9c3;
        --color-yellow-700: #a16207;
        --color-silver-100: #e5e7eb;
        --color-silver-700: #374151;
        --color-indigo-100: #e0e7ff;
        --color-indigo-700: #4338ca;

        --color-red-100: #fee2e2;
        --color-red-700: #b91c1c;
        --color-red-800: #991b1b;

        --backdrop-color: rgba(255, 255, 255, 0.1);
        --backdrop-sidebar:  #ffffffdb;


        --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.04);
        --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.06);
        --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.12);
        --shadow-mat:  rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;



        /* For dark mode */
        --image-grayscale: 0;
        --image-opacity: 100%;
    }
  &.dark-mode{
          /* Indigo */
        --color-brand-50: #eef2ff;
        --color-brand-100: #e0e7ff;
        --color-brand-200: #c7d2fe;
        --color-brand-500: #6366f1;
        --color-brand-600: #4f46e5;
        --color-brand-700: #4338ca;
        --color-brand-800: #3730a3;
        --color-brand-900: #312e81;

        --color-grey-0: #18212f;
        --color-grey-50: #111827;
        --color-grey-100: #1f2937;
        --color-grey-200: #374151;
        --color-grey-300: #4b5563;
        --color-grey-400: #6b7280;
        --color-grey-500: #9ca3af;
        --color-grey-600: #d1d5db;
        --color-grey-700: #e5e7eb;
        --color-grey-800: #f3f4f6;
        --color-grey-900: #f9fafb;

        --color-blue-100: #075985;
        --color-blue-700: #e0f2fe;
        --color-green-100: #166534;
        --color-green-700: #dcfce7;
        --color-green-soft: #3faba4;
        --color-green-soft-700: #57bdb6;
        --color-green-sharp: #2ab4c0;
        --color-green-sharp-700: #52bfc9;
        --color-purple-sharp: #796799;
        --color-purple-sharp-700: #4e347a;
        --color-yellow-100: #854d0e;
        --color-yellow-700: #fef9c3;
        --color-silver-100: #374151;
        --color-silver-700: #f3f4f6;
        --color-indigo-100: #3730a3;
        --color-indigo-700: #e0e7ff;

        --color-red-100: #fee2e2;
        --color-red-700: #b91c1c;
        --color-red-800: #991b1b;



        --backdrop-color: rgba(0, 0, 0, 0.3);
        --backdrop-sidebar: #18212fed;


        --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.4);
        --shadow-md: 0px 0.6rem 2.4rem rgba(0, 0, 0, 0.3);
        --shadow-lg: 0 2.4rem 3.2rem rgba(0, 0, 0, 0.4);
        --shadow-mat:  rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
        --image-grayscale: 10%;
        --image-opacity: 90%;
    }
        --border-radius-tiny: 3px;
        --border-radius-sm: 5px;
        --border-radius-md: 7px;
        --border-radius-lg: 9px;
        --color-success: #00bcd4;
        --color-warning: #dd6b20;
        --color-secondary: #9ca3af;
        --color-primary: #1976d2;
}
*,
*::before,
*::after {
  box-sizing: border-box;
  padding: 0;
  margin: 0;

  /* Creating animations for dark mode */
  transition: background-color 0.3s, border 0.3s;
    }
html {
  font-size: 62.5%;
  font-family: "Rubik", serif !important  ;
}
*{
  font-family: "Rubik", serif   ;
}
body {
  font-family: "Poppins", sans-serif;
  color: var(--color-grey-700);
  padding: 18px;
  transition: color 0.3s, background-color 0.3s;
  min-height: 100vh;
  line-height: 1.5;
  font-family: "Rubik", serif !important  ;
  font-size: 1.6rem;
}

input,
button,
textarea,
select {
  font: inherit;
  color: inherit;
}

button {
  cursor: pointer;
}

*:disabled {
  cursor: not-allowed;
}

select:disabled,
input:disabled {
  background-color: var(--color-grey-200);
  color: var(--color-grey-500);
}

input:focus,
button:focus,
textarea:focus,
select:focus {
  outline: 2px solid var(--color-brand-600);
  outline-offset: -1px;
}

/* Parent selector, finally 😃 */
button:has(svg) {
  line-height: 0;
}

a {
  color: inherit;
  text-decoration: none;
}

ul {
  list-style: none;
}

p,
h1,
h2,
h3,
h4,
h5,
h6 {
  overflow-wrap: break-word;
  hyphens: auto;
  font-family: "Rubik", serif !important  ;
}

img {
  max-width: 100%;

  /* For dark mode */
  filter: grayscale(var(--image-grayscale)) opacity(var(--image-opacity));
}
.loader {
  width: 48px;
  height: 48px;
  background: #FF3D00;
  display: block;
  margin: 20px auto;
  position: relative;
  box-sizing: border-box;
  animation: rotationBack 1s ease-in-out infinite reverse;
}
.loader::before {
  content: '';
  box-sizing: border-box;
  left: 0;
  top: 0;
  transform: rotate(45deg);
  position: absolute;
  width: 48px;
  height: 48px;
  background: #FF3D00;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}
.loader::after {
  content: '';
  box-sizing: border-box;
  width: 32px;
  height: 32px;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  top: 50%;
  background: #FFF;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.15);
}
@keyframes rotationBack {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(-360deg);
  }
}
/* width */
::-webkit-scrollbar {
  width: 10px;
}

/* Track */
::-webkit-scrollbar-track {
  /* background: #f1f1f1;  */
  background: var(--color-grey-200);

}

/* Handle */
::-webkit-scrollbar-thumb {
  /* background: #888;  */
  background: var(--color-grey-400);

}

/* Handle on hover */
::-webkit-scrollbar-thumb:hover {
  /* background: #555;  */
  background: var(--color-grey-500);
}
.fc .fc-col-header-cell-cushion {
  display: block;
  padding: 10px 4px;
  color: var(--color-grey-500);
  letter-spacing: 1px;
  text-transform: uppercase;
  font-weight: 600;
  width: 100%;
  background-color: var(--color-grey-0);
}
.fc .fc-col-header-cell-cushion { /* needs to be same precedence */
  padding: 1.2rem 0;
}
.fc .fc-scrollgrid-liquid{
  background-color: var(--color-grey-50);
}
.fc-theme-standard .fc-popover{
  background-color: var(--color-grey-0);
}
@media screen and (max-width: 600px) {
  .fc .fc-toolbar {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 1rem;
    & .fc-toolbar-chunk{
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
    }
}

}
`;
export default GlobalStyle;