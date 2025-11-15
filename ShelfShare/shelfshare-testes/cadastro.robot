*** Settings ***
Library    SeleniumLibrary
# Removi a 'Library String', não precisamos dela

*** Variables ***
${NAVEGADOR}        Chrome
${URL_CADASTRO}     http://localhost:5173/cadastro
${URL_LOGIN}        http://localhost:5173/login
${DRIVER_PATH}      ./chromedriver.exe
# Removi a variável ${TIMESTAMP} daqui, pois ela falhou

*** Test Cases ***
Cadastro com Dados Válidos
    [Documentation]    Este teste verifica se um novo usuário
    ...                consegue se cadastrar e ser redirecionado
    ...                para a tela de login.
    
    Abrir Navegador e Acessar Página de Cadastro
    
    # --- CORREÇÃO AQUI ---
    # 1. Pega o "epoch time" (ex: 1678881234)
    ${TIMESTAMP} =    Get Time    epoch  
    # 2. Cria o e-mail único
    ${email_unico} =    Set Variable    usuario_${TIMESTAMP}@teste.com
    
    Preencher Formulário de Cadastro    Usuário Teste Robot    ${email_unico}    senha123
    Clicar no Botão Cadastrar
    Verificar se foi Redirecionado para o Login
    [Teardown]    Fechar Navegador

*** Keywords ***
Abrir Navegador e Acessar Página de Cadastro
    Open Browser    ${URL_CADASTRO}    ${NAVEGADOR}    service_executable_path=${DRIVER_PATH}
    Wait Until Element Is Visible    id:nome

Preencher Formulário de Cadastro
    [Arguments]    ${nome}    ${email}    ${senha}
    Input Text    id:nome     ${nome}
    Input Text    id:email    ${email}
    Input Text    id:senha    ${senha}

Clicar no Botão Cadastrar
    Click Button    Cadastrar

Verificar se foi Redirecionado para o Login
    # Aumentei o tempo para 10s, pois o cadastro e redirect podem demorar
    Wait Until Location Contains    ${URL_LOGIN}    timeout=10s 

Fechar Navegador
    Close Browser