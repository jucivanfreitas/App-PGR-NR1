import { expect, test } from "@playwright/test";

test("home onboarding exposes stack guidance", async ({ page }) => {
  await page.goto("/");

  await expect(page.getByText("Framework pronto para a era da IA")).toBeVisible();
  await expect(page.getByRole("heading", { name: "Uma base de engenharia para vencer a bolha de IA com método" })).toBeVisible();
  await expect(page.getByText("Stack version", { exact: true })).toBeVisible();
  await expect(page.getByRole("link", { name: "Ver a stack em operação" })).toBeVisible();
});

test("sign-in and subscription pages keep the same stack language", async ({ page }) => {
  await page.goto("/sign-in");
  await expect(page.getByRole("heading", { name: "Entrar é um módulo do stack, não o começo da conversa" })).toBeVisible();
  await expect(page.getByText("Checklist de auth")).toBeVisible();

  await page.goto("/subscribe");
  await expect(page.getByRole("heading", { name: "Assinatura é uma etapa controlada, não um bloqueio" })).toBeVisible();
  await expect(page.getByText("Estados de acesso")).toBeVisible();
});

test("dashboard remains the secondary operational view", async ({ page }) => {
  await page.goto("/app/dashboard");

  await expect(page.getByRole("heading", { name: "Dashboard da stack" })).toBeVisible();
  await expect(page.getByText("Status atual")).toBeVisible();
  await expect(page.getByRole("heading", { name: "TRIAL" })).toBeVisible();
});
