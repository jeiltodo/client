"use client"
import { Button, Dropdown } from "@jeiltodo/ui";

export default function Page(): JSX.Element {
  return (
    <main>
      <Button>버튼</Button>
      <Dropdown>
        <Dropdown.Toggle>목표를 선택하세요</Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item value="목표 1">목표 1</Dropdown.Item>
          <Dropdown.Item value="목표 2">목표 2</Dropdown.Item>
          <Dropdown.Item value="목표 3">목표 3</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
    </main>
  );
}
