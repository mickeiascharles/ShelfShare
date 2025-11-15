*** Settings ***
Library    SeleniumLibrary

*** Variables ***
${NAVEGADOR}      Chrome
${URL_LOGIN}      http://localhost:5173/login
${URL_DASH}       http://localhost:5173/dashboard
${EMAIL}          mickeias@teste.com
${SENHA}          senha123
${DRIVER_PATH}    ./chromedriver.exe

*** Test Cases ***
Login com Credenciais Válidas
    [Documentation]    Este teste verifica se um usuário com credenciais
    ...                válidas consegue fazer login e ser redirecionado.
    
    Abrir Navegador e Acessar Página de Login
    Preencher Formulário de Login    ${EMAIL}    ${SENHA}
    Clicar no Botão Entrar
    Verificar se foi Redirecionado para o Dashboard
    [Teardown]    Fechar Navegador

*** Keywords ***
Abrir Navegador e Acessar Página de Login
    # CORREÇÃO 1: Usando a 'service_executable_path' para corrigir o WARN
    Open Browser    ${URL_LOGIN}    ${NAVEGADOR}    service_executable_path=${DRIVER_PATH}
    Wait Until Element Is Visible    id:email

Preencher Formulário de Login
    [Arguments]    ${email_usuario}    ${senha_usuario}
    Input Text    id:email    ${email_usuario}
    Input Text    id:senha    ${senha_usuario}

Clicar no Botão Entrar
    # CORREÇÃO 2: Procurando o botão pelo texto "Entrar" (que é o correto)
    Click Button    Entrar

Verificar se foi Redirecionado para o Dashboard
    Wait Until Location Contains    ${URL_DASH}    timeout=5s

Fechar Navegador
    Close Browser