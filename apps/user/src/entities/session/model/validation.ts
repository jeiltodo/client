export const validateName = (name: string): string | undefined => {
  return name.trim() === '' ? '이름을 입력해 주세요.' : undefined;
};

export const validateEmail = async (
  email: string
): Promise<string | undefined> => {
  // 이 함수는 실제로 서버에 요청을 보내 이메일 중복을 확인해야 합니다.
  // 여기서는 예시로 간단히 구현합니다.
  await new Promise((resolve) => setTimeout(resolve, 500)); // 서버 요청 시뮬레이션
  return email.includes('existing')
    ? '이미 사용 중인 이메일입니다.'
    : undefined;
};

export const validatePassword = (password: string): string | undefined => {
  return password.length < 8
    ? '비밀번호가 8자 이상이 되도록 해 주세요.'
    : undefined;
};

export const validateConfirmPassword = (
  password: string,
  confirmPassword: string
): string | undefined => {
  return password !== confirmPassword
    ? '비밀번호가 일치하지 않습니다.'
    : undefined;
};
