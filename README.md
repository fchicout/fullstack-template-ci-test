# 🚀 Fullstack Project Starter (Spring Boot 3 + Angular 22 Zoneless)

> **Unidade de Extensão: Fullstack (SENAC 2026.2)**  
> **Docente:** Prof. Fábio Chicout  
> **Servidor SonarQube:** [https://sonar.fchicout.dev](https://sonar.fchicout.dev)

---

## 🏛️ Visão Geral da Arquitetura

Este repositório contém o scaffolding padronizado e atualizado para o desenvolvimento dos projetos da Unidade de Extensão Fullstack:
- **Backend:** Java 21 LTS, Spring Boot 3.3, Spring Web, Spring Validation, Actuator, ArchUnit, Checkstyle (Linting) e JaCoCo (Cobertura de Código).
- **Frontend:** Angular 22 (Arquitetura 100% **Zoneless**, Reatividade com **Signals**, Detecção **OnPush**, runner moderno **Vitest**, linter **ESLint** e build com esbuild/Vite).
- **Quality, Supply Chain & Security Gates:**
  - **Linting:** Checkstyle (Java) + ESLint (Angular 22).
  - **SAST:** Análise estática com **Semgrep** (OWASP Top 10, Spring e TypeScript).
  - **Secret Scanning:** **Betterleaks** (detecção avançada de credenciais e tokens vazados).
  - **Supply Chain Security:** **Syft** (Geração de SBOM em formato SPDX) + **Grype** (Varredura de CVEs de dependências).
  - **Quality Gate:** SonarQube institucional (`sonar.fchicout.dev`) com padrão "Sonar way".
  - **DAST Diferenciado:**
    - **Staging / Branch `development`:** Varredura dinâmica com **ProjectDiscovery Nuclei**.
    - **Produção / Branch `main`:** Varredura dinâmica aprofundada com **OWASP ZAP Baseline Scan**.
- **CI/CD Automatizado:** Workflows no GitHub Actions com deploy condicional para **Staging** (branch `development`) e **Produção** (branch `main`).

---

## 🌳 Política de Branches & Fluxo Git Paralelo

Seguindo o fluxo profissional de integração contínua:
* `development`: Branch de integração ativa. Todo push dispara testes, lint, SAST, Betterleaks, Syft/Grype, SonarQube, DAST (Nuclei) e deploy no ambiente de **Staging**.
* `main`: Branch de entrega de versão estável. Todo push dispara validações completas, DAST (OWASP ZAP) e deploy no ambiente de **Produção**.
* `feature/*` ou `bugfix/*`: Branches de trabalho individuais dos desenvolvedores vinculadas a Issues, integradas via Pull Request para a branch `development`.

Consulte o passo a passo completo do fluxo de desenvolvimento no [GITHUB_SETUP_GUIDE.md](GITHUB_SETUP_GUIDE.md).

---

## ⚙️ Configuração dos Secrets no Repositório GitHub

Para que o pipeline do GitHub Actions consiga enviar os relatórios para o SonarQube e validar o Quality Gate, o líder da equipe deve cadastrar os seguintes segredos no repositório:

1. Acesse o repositório no GitHub: **Settings &rarr; Secrets and variables &rarr; Actions &rarr; New repository secret**.
2. Cadastre as seguintes variáveis:
   * **`SONAR_TOKEN`** *(Obrigatório)*: Token de análise de projeto gerado no SonarQube ([https://sonar.fchicout.dev](https://sonar.fchicout.dev)).
   * **`SONAR_HOST_URL`** *(Opcional, padrão no workflow)*: `https://sonar.fchicout.dev`.

---

## 💻 Execução Local

### 1. Pré-requisitos
- **Java JDK 21 LTS** instalado.
- **Node.js 22 LTS** e **npm** instalados.
- **Maven 3.9+** (ou use o Maven Wrapper incluído).

### 2. Linting Local
```bash
# Linting do Backend (Java Checkstyle)
cd backend
mvn checkstyle:check

# Linting do Frontend (Angular ESLint)
cd frontend
npm run lint
```

### 3. Rodando o Backend (Spring Boot 3)
```bash
cd backend
mvn clean spring-boot:run
```
* A API estará disponível em: `http://localhost:8080`
* Endpoint de saúde: `http://localhost:8080/api/v1/health`

### 4. Rodando o Frontend (Angular 22)
```bash
cd frontend
npm install
npm start
```
* A aplicação web estará acessível em: `http://localhost:4200`

### 5. Executando os Testes e Gerando Cobertura Localmente
```bash
# Testes do Backend + JaCoCo Report
cd backend
mvn clean test jacoco:report

# Testes do Frontend com Vitest
cd frontend
npm test
```
* O relatório HTML de cobertura do backend será gerado em: `backend/target/site/jacoco/index.html`.
