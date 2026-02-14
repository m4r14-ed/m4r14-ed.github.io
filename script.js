// Menu responsivo
document.addEventListener('DOMContentLoaded', function() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            if (navLinks.style.display === 'flex') {
                navLinks.style.display = 'none';
            } else {
                navLinks.style.display = 'flex';
            }
        });
    }
    
    // Fechar menu ao clicar em um link
    const links = document.querySelectorAll('.nav-links a');
    links.forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                navLinks.style.display = 'none';
            }
        });
    });
    
    // Smooth scroll para links internos
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Configurar filtros da galeria
    configurarFiltros();
    
    // Configurar modal
    configurarModal();
});

// Função para comprar produto (chamada pelos botões)
function comprarProduto(nome, preco) {
    // Criar mensagem para WhatsApp
    const mensagem = `Olá! Tenho interesse no produto: ${nome} - ${preco}`;
    const urlWhatsApp = `https://wa.me/5546999892329?text=${encodeURIComponent(mensagem)}`;
    window.open(urlWhatsApp, '_blank');
}

// Função para configurar os filtros da galeria
function configurarFiltros() {
    const filtros = document.querySelectorAll('.filtro-btn');
    const galeriaItens = document.querySelectorAll('.galeria-item');
    
    if (filtros.length === 0) return;
    
    filtros.forEach(filtro => {
        filtro.addEventListener('click', function() {
            // Remover classe 'ativo' de todos os filtros
            filtros.forEach(f => f.classList.remove('ativo'));
            
            // Adicionar classe 'ativo' ao filtro clicado
            this.classList.add('ativo');
            
            // Obter o valor do filtro
            const valorFiltro = this.getAttribute('data-filtro');
            
            // Filtrar os itens da galeria
            galeriaItens.forEach(item => {
                if (valorFiltro === 'todos' || item.getAttribute('data-categoria') === valorFiltro) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
}

// Função para configurar o modal
function configurarModal() {
    const modal = document.getElementById('modal');
    if (!modal) return;
    
    const modalImg = document.getElementById('modal-imagem');
    const modalLegenda = document.getElementById('modal-legenda');
    const fecharModal = document.querySelector('.modal-fechar');
    
    // Abrir modal ao clicar em uma imagem da galeria
    const galeriaItens = document.querySelectorAll('.galeria-item');
    galeriaItens.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const titulo = this.querySelector('h3').textContent;
            const descricao = this.querySelector('p').textContent;
            
            modal.style.display = 'block';
            modalImg.src = img.src;
            modalLegenda.innerHTML = `<strong>${titulo}</strong><br>${descricao}`;
        });
    });
    
    // Fechar modal
    if (fecharModal) {
        fecharModal.addEventListener('click', function() {
            modal.style.display = 'none';
        });
    }
    
    // Fechar modal ao clicar fora da imagem
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
}

// Formulário de encomenda
const formEncomenda = document.getElementById('form-encomenda');
if (formEncomenda) {
    formEncomenda.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Coletar dados do formulário
        const nome = document.getElementById('nome').value;
        const telefone = document.getElementById('telefone').value;
        const cores = document.getElementById('cores').value;
        const detalhes = document.getElementById('detalhes').value;
        const data = document.getElementById('data').value;
        
        // Criar mensagem personalizada
        let mensagem = `*Nova Encomenda Personalizada*%0A%0A`;
        mensagem += `*Nome:* ${nome}%0A`;
        mensagem += `*Telefone:* ${telefone}%0A`;
        mensagem += `*Cores desejadas:* ${cores}%0A`;
        mensagem += `*Detalhes:* ${detalhes}%0A`;
        mensagem += `*Data desejada:* ${data || 'Não especificada'}%0A%0A`;
        mensagem += `Por favor, enviar orçamento.`;
        
        // Abrir WhatsApp com a mensagem
        const urlWhatsApp = `https://wa.me/5546999892329?text=${mensagem}`;
        window.open(urlWhatsApp, '_blank');
        
        // Limpar formulário
        formEncomenda.reset();
        
        // Mostrar mensagem de sucesso
        alert('Solicitação enviada! Em breve entraremos em contato pelo WhatsApp.');
    });
}

// Animação de scroll para header
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.style.background = 'linear-gradient(135deg, #7b1fa2, #2a4a8a)';
    } else {
        header.style.background = 'linear-gradient(135deg, #6a0dad, #1e3c72)';
    }
});

// Validação de telefone
const telefoneInput = document.getElementById('telefone');
if (telefoneInput) {
    telefoneInput.addEventListener('input', function(e) {
        let valor = e.target.value.replace(/\D/g, '');
        if (valor.length <= 11) {
            valor = valor.replace(/^(\d{2})(\d)/g, '($1) $2');
            valor = valor.replace(/(\d)(\d{4})$/, '$1-$2');
            e.target.value = valor;
        }
    });
}

// Data mínima (hoje) para o campo de data
const dataInput = document.getElementById('data');
if (dataInput) {
    const hoje = new Date().toISOString().split('T')[0];
    dataInput.setAttribute('min', hoje);
}