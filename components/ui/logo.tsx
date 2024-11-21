"use client";

export function Logo({ className = "w-32 h-auto" }: { className?: string }) {
  return (
    <svg 
      viewBox="0 0 856.45 169.79" 
      className={className}
      aria-label="Plainsale"
    >
      <path 
        fill="#002447" 
        d="M84.86,169.79C38.05,169.87.56,132.03,0,85.1-.5,42.31,33.73.14,84.77,0c47.23-.13,84.73,36.45,85.18,86.15.41,45.51-38.62,83.55-85.09,83.63ZM137.19,69.41c-5.12-5.82-9.59-10.7-13.81-15.77-1.93-2.31-4.03-3.25-7.06-3.23-18.93.12-37.86.41-56.78-.12-7.18-.2-12.4,1.47-16.53,7.46-2.72,3.93-6.3,7.26-10.21,11.67h104.4ZM85.19,73.1c-1.16,0-2.31,0-3.47,0-15.32,0-30.63.05-45.95-.04-3.02-.02-4.58.76-4.48,4.12.16,5.41,2.61,7.99,8.49,8,30.05.04,60.11.03,90.16,0,1.43,0,2.92-.12,4.27-.55,3.36-1.08,5.15-4.88,4.5-8.89-.63-3.88-3.67-2.58-5.84-2.59-15.89-.1-31.79-.05-47.68-.05ZM59.15,102.41c0-3.61-.07-7.21.03-10.82.06-2.1-.53-3.27-2.88-3.21-3.75.09-7.51-.14-11.24.12-1.06.07-2.9,1.37-2.92,2.13-.16,7.78-.35,15.58.16,23.33.3,4.43,4.01,5.91,10.64,5.24,4.06-.42,6.1-2.61,6.2-6.84.08-3.32.02-6.63.01-9.95ZM110.83,102.17s.02,0,.04,0c0,3.61-.13,7.23.03,10.84.22,4.66,2.48,6.24,8.47,6.22,5.79-.01,8.19-1.77,8.34-6.44.15-4.62.05-9.25.05-13.88q0-10.54-10.74-10.53q-6.18,0-6.19,5.98c0,2.6,0,5.2,0,7.81Z M232.03,112.73v36.01h-17.27V45.2h16.02c.16,3.18.31,6.24.51,10.34,10.32-10.08,21.97-12.08,34.66-9.54,8.82,1.76,16.19,6.1,21.7,13.3,11.41,14.91,9.92,39.15-3.14,52.35-13.43,13.57-34.02,14.26-52.48,1.09ZM231.62,83.64c0,13.86,9.83,24.08,23.14,24.04,13.31-.04,23.14-10.38,22.99-24.19-.15-13.83-9.66-23.69-22.92-23.74-13.45-.06-23.21,9.99-23.21,23.89Z M856.45,89.19h-60.25c1.33,7.63,5.31,12.4,11.37,15.54,10.49,5.44,21.5,3.98,34.61-4.66,2.86,3.25,5.78,6.56,8.87,10.07-5.01,5.97-11.25,9.31-18.49,10.85-16.02,3.42-31.05,1.52-43.15-10.36-11.31-11.1-13.39-25.03-8.77-39.72,4.54-14.43,15.08-22.74,29.82-25.22,22.71-3.83,41.09,8.52,45.17,30.1.76,4.04.54,8.27.82,13.38ZM839.4,77.45c-.74-11.35-10.7-19.24-23.11-18.54-10.93.62-20.21,9.3-19.64,18.54h42.76Z M659.65,66.51c-2.32-4.26-4.38-8.05-6.86-12.6,4.14-1.99,7.86-4.2,11.86-5.6,9.58-3.36,19.5-4.15,29.54-2.61,15.84,2.42,24.48,11.81,25.39,29.14.73,14,.2,28.07.22,42.11,0,1.29,0,2.59,0,4.27h-16.04c-.21-2.43-.43-5.05-.72-8.56-7.55,8.21-16.62,10.29-26.44,9.7-7.49-.45-14.56-2.37-20.08-7.98-9.83-9.99-7.26-27.04,5.4-32.95,4.59-2.14,9.92-3.18,15.01-3.63,7.04-.63,14.17-.39,21.26-.19,3.46.1,4.16-1.17,3.81-4.34-.81-7.31-5.89-12.32-14.18-13.45-8.92-1.22-17.26.62-25.09,4.94-.87.48-1.72.98-3.07,1.76ZM690.11,88.69c-.01-.13-.02-.26-.03-.38-4.72.43-9.51.54-14.16,1.38-5.11.92-7.93,4.31-8.2,8.74-.28,4.58,2.32,8.61,7.16,10.18,6.56,2.13,13.13,1.85,19.28-1.51,6.02-3.29,8.9-8.35,8.15-15.37-.22-2.1-.83-3.16-3.11-3.07-3.03.12-6.06.03-9.09.03Z M400.31,77.58c.95-10.14-4.06-16.36-13.71-17.74-8.92-1.28-17.26.56-25.11,4.84-.88.48-1.72,1-3.17,1.85-2.2-4-4.31-7.85-6.57-11.97,5.19-4.54,11.26-7,17.65-7.9,7.1-1,14.42-1.6,21.54-1.03,16.05,1.29,25.61,10.02,26.7,26.05,1.11,16.37.25,32.88.25,49.63h-15.54c-.18-2.62-.36-5.13-.57-8.1-.83.45-1.4.58-1.7.94-8.52,10.31-30.7,10.61-41.48,3.11-6.63-4.61-9.77-10.96-9.28-18.92.53-8.4,4.67-14.78,12.66-17.55,5.23-1.81,10.92-2.68,16.47-3.07,7.17-.51,14.41-.12,21.86-.12ZM399.93,88.33c-8.25.4-16.74.44-25.14,1.35-5.38.59-8.24,4.32-8.43,8.94-.18,4.6,2.4,8.74,7.37,9.96,3.97.97,8.36,1.43,12.36.81,9.06-1.4,17.76-8.42,13.85-21.06Z M500.8,121.43h-16.92c-.12-1.59-.33-3.11-.34-4.63-.02-22.27.06-44.54-.09-66.81-.03-3.84.85-5.58,5.03-5.18,3.69.35,7.44.07,11.68.07v10.06c1.26-.7,1.91-.94,2.39-1.35,10.95-9.35,23.5-10.57,36.68-6.53,11.5,3.53,17.9,12.4,18.57,23.81.97,16.68.25,33.46.25,50.46h-16.96c0-3.74,0-7.31,0-10.88,0-9.83.04-19.67-.02-29.5-.08-13.41-6.23-20.5-17.95-20.8-12.8-.32-21.59,7.65-21.96,20.54-.35,12.14-.11,24.29-.15,36.44,0,1.28-.11,2.56-.19,4.3Z M573.37,113.98c2.24-4.35,4.31-8.4,6.57-12.79,9.97,5.46,20.26,7.81,31.18,6.8,2.4-.22,5.17-.45,7.02-1.74,1.99-1.39,3.79-3.85,4.44-6.19.87-3.12-1.64-5.28-4.39-6.06-5.12-1.45-10.4-2.36-15.6-3.56-4.63-1.07-9.35-1.91-13.84-3.43-6.88-2.33-11.69-6.88-12.81-14.42-1.22-8.22,1.07-15.2,7.78-20.39,7.23-5.59,15.8-7,24.56-7.12,9.9-.14,19.54,1.44,29.03,6.37-2.2,4.4-4.28,8.58-5.94,11.89-7.48-1.53-14.29-3.43-21.22-4.15-4-.42-8.3.72-12.29,1.81-3.05.83-5.1,3.2-5.16,6.75-.06,3.65,2.15,5.79,5.23,6.61,6.12,1.62,12.38,2.71,18.55,4.17,3.78.89,7.64,1.71,11.22,3.17,14.32,5.82,16.63,23.78,4.41,33.37-5.67,4.45-12.36,6.09-19.32,6.93-12.35,1.48-24.18-.47-35.48-5.63-1.27-.58-2.41-1.43-3.95-2.35Z M330.49,16.05v105.19h-17.13V16.05h17.13Z M760.46,121.38h-16.68V16.24h16.68v105.15Z M459.14,121.4c-1.22.08-2.06.19-2.9.19-4.47.02-8.95,0-13.92,0-.12-1.57-.33-2.95-.33-4.32-.02-22.57.05-45.15-.08-67.72-.02-3.48.79-5.01,4.55-4.74,4.13.3,8.31.07,12.68.07v76.52Z M461.78,21.29c-.01,6.2-4.67,10.76-11.02,10.79-6.35.03-11.16-4.61-11.08-10.69.08-5.97,4.62-10.12,11.07-10.14,6.59-.01,11.05,4.04,11.04,10.04Z"
      />
    </svg>
  );
}