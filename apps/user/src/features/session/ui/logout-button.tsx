import { Button } from '@jeiltodo/ui/shared';
import { logoutApi } from '../../../entities/session';

export function logoutButton() {
  return <Button onClick={logoutApi}>로그아웃</Button>;
}
