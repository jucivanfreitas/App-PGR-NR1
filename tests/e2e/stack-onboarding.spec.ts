import { expect, test } from "@playwright/test";

test("home mostra o onboarding da stack", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByRole("heading", { name: "Fork instalado com sucesso", exact: true })).toBeVisible();
  await expect(page.getByText("IA-1stEngine", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ler STACK.md", exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "README.md", exact: true })).toBeVisible();
});

test("sign-in aparece como página descontinuada", async ({ page }) => {
  await page.goto("/sign-in");

  await expect(page.getByRole("heading", { name: "Página descontinuada", exact: true })).toBeVisible();
  await expect(page.getByText("A base IA-1stEngine não exige esta página como fluxo principal.")).toBeVisible();
  await expect(page.getByRole("link", { name: "Abrir dashboard" })).toBeVisible();
});

test("dashboard mostra visão da stack e agentes padrão", async ({ page }) => {
  await page.goto("/app/dashboard");

  await expect(page.getByRole("heading", { name: "Dashboard da stack, metodologia e fluxo de desenvolvimento", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Agentes padrão da stack", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Skills padrão", exact: true })).toBeVisible();
  await expect(page.getByRole("heading", { name: "Dependências de processo e atuação", exact: true })).toBeVisible();
});
