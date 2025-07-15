import { Text } from '@adobe/react-spectrum';

interface RomanInscriptionProps {
  children: string;
  color?: string;
  backgroundColor?: string;
  size?: string;
}

/*
  I wasn't able to find a way to make the Roman text as impressive as I wanted using Adobe conventions, so I'm trying the UNSAFE approach.
  More appropriate might be generating an image with the roman numerals, as long as it could be done quickly.
*/
export function RomanInscription({
  children,
  size = '1.5rem',
}: RomanInscriptionProps) {
  return (
    <div
      style={{
        padding: '0.5em 1em',
        borderRadius: '0.5em',
        display: 'inline-block',
        boxShadow: `0 0 4px`,
      }}
    >
      <Text
        UNSAFE_style={{
          fontSize: size,
          fontWeight: 600,
          fontFamily: `'Trajan Pro', 'Times New Roman', Georgia, serif`,
          textTransform: 'uppercase',
          letterSpacing: '0.07em',
        }}
      >
        {children}
      </Text>
    </div>
  );
}