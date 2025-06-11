import { test, expect } from '@playwright/test';

test.describe('Todo App E2E Tests', () => {
  test.beforeEach(async ({ page }) => {
    // 각 테스트 실행 전에 앱의 메인 페이지로 이동합니다.
    await page.goto('/');
  });

  test('should add, complete, and delete a todo item', async ({ page }) => {
    const newTodoTitle = '장보기';

    // 1. 새로운 할 일 입력 및 추가
    await page.getByPlaceholder('할 일 명을 입력하세요').fill(newTodoTitle);
    await page.getByRole('button', { name: '추가' }).click();

    // 2. 할 일이 테이블에 추가되었는지 확인
    // 'name' 옵션은 행 전체의 텍스트 콘텐츠에서 일치하는 것을 찾습니다.
    const todoRow = page.getByRole('row', { name: newTodoTitle });
    await expect(todoRow).toBeVisible();

    // 3. 할 일 완료 처리
    // 해당 행 안에서 체크박스를 찾아 클릭합니다.
    await todoRow.getByRole('checkbox').check();

    // 4. 완료 상태(취소선) 확인
    // 행 내부에서 할 일 제목을 포함하는 특정 셀을 찾아 스타일을 확인합니다.
    const todoCell = todoRow.getByRole('cell', { name: newTodoTitle });
    await expect(todoCell).toHaveCSS('text-decoration-line', 'line-through');

    // 5. 할 일 삭제
    // Mantine의 ActionIcon은 특별한 role이 없을 수 있으므로, 
    // 아이콘을 감싸는 버튼에 설정된 aria-label을 기반으로 찾습니다.
    // 여기서는 '삭제' 아이콘을 포함한 버튼을 찾습니다.
    // IconTrash는 일반적으로 'delete' 또는 'trash'와 같은 레이블을 가집니다.
    // Mantine의 ActionIcon은 aria-label이 자동으로 설정되지 않을 수 있으므로, 
    // 여기서는 title 속성이나 다른 식별자를 찾아야 할 수 있습니다.
    // 가장 확실한 방법은 ActionIcon을 포함하는 버튼을 찾는 것입니다.
    // 여기서는 휴지통 아이콘이 있는 버튼을 찾습니다.
    // 해당 버튼은 'Actions' 헤더 아래에 있습니다.
    await todoRow.getByRole('button').nth(1).click(); // Edit 다음 Delete 버튼

    // 6. 할 일이 목록에서 사라졌는지 확인
    await expect(todoRow).not.toBeVisible();
  });
});
