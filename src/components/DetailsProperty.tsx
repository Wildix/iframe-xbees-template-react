import Link from '@mui/material/Link';
import {styled} from '@mui/material/styles';
import {CopyInfoButton} from '@wildix/xbees-connect-react';

const PropertyRoot = styled('div')({
  display: 'flex',
  flexDirection: 'row',
  width: '100%',
  padding: '8px 0',
  alignItems: 'center',
  ' .MuiSvgIcon-root': {
    display: 'none',
  },
  '&:hover .MuiSvgIcon-root': {
    display: 'inherit',
  },
});

const PropertyTitle = styled('div')({
  minWidth: '80px',
  maxWidth: '150px',
  fontSize: '13px',
  lineHeight: '20px',
});

const PropertyValueText = styled('div')({
  fontWeight: '500',
  fontSize: 13,
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  lineHeight: '20px',
});

const PropertyHoverObserver = styled('div')({
  display: 'flex',
  gap: 4,
  minWidth: 0,
  whiteSpace: 'nowrap',
});

const PropertyValueLink = styled(Link)(({theme}) => ({
  color: theme.palette.primary.main,
  fontSize: 13,
  cursor: 'pointer',
  overflow: 'hidden',
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
  '&:hover': {
    color: theme.palette.primary.main,
  }
}));

interface ContactPropertyProps {
  title: string;
  value: string;
  variant?: 'email' | 'phone';
  onClick?: () => void;
  'data-qa'?: string;
}

export default function DetailsProperty({'data-qa': dataQa, title, value, variant, onClick}: ContactPropertyProps) {
  let valueComponent;

  switch (variant) {
    case 'email': {
      valueComponent = (
        <PropertyValueLink
          data-qa={`${dataQa}-value`}
          href={`mailto:${value}`}
          underline="none"
          target="_blank"
          rel="noopener"
          onClick={onClick}
        >
          {value}
        </PropertyValueLink>
      );
      break;
    }

    case 'phone': {
      valueComponent = (
        <PropertyValueLink data-qa={`${dataQa}-value`} underline="none" onClick={onClick}>
          {value}
        </PropertyValueLink>
      );
      break;
    }

    default: {
      valueComponent = (
        <PropertyValueText data-qa={`${dataQa}-value`}>
          {value}
        </PropertyValueText>
      );
    }
  }

  return (
    <PropertyRoot>
      <PropertyTitle data-qa={`${dataQa}-label`}>
        {title}
        :
      </PropertyTitle>
      <PropertyHoverObserver>
        {valueComponent}
        <CopyInfoButton value={value} size={20} />
      </PropertyHoverObserver>
    </PropertyRoot>
  );
}
