import { Button } from '@jeiltodo/ui/shared';
import { sessionService } from '../model/sessionService';

export function logoutButton() {
  return <Button onClick={sessionService.logout}>로그아웃</Button>;
}
