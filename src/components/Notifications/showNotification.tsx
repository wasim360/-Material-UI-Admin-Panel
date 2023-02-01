import { useSnackbar, VariantType } from 'notistack';
import { FC } from 'react';

interface IProps {
  message: string;
  variant: VariantType;
}
const ShowNotification: FC<IProps> = ({ message, variant }) => {
  const { enqueueSnackbar } = useSnackbar();
  console.log('hereee');
  enqueueSnackbar(`${message}`, {
    variant: variant,
  });

  return null;
};

export default ShowNotification;
