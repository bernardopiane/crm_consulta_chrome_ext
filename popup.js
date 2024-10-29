

document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('submit').addEventListener('click', () => {
        const name = document.getElementById('name').value;
        const number = document.getElementById('crm').value;

        // Display the entered information in the result div
        const resultDiv = document.getElementById('result');
        resultDiv.innerHTML = `<strong>Name:</strong> ${name}<br><strong>Number:</strong> ${number}`;

        // Add a loading spinner while the fetch request is in progress
        const spinner = document.createElement('div');
        spinner.id = 'spinner';
        spinner.innerHTML = 'Loading... <div class="spinner"></div>';
        resultDiv.appendChild(spinner);

        // Fetch data from an API based on the entered name and number
        fetch('https://sistemacremerj.com.br/crmonline/SifaOnLineServicosPublicosAction.do', {
            method: 'POST',
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:131.0) Gecko/20100101 Firefox/131.0',
                'Accept': 'text/html, */*; q=0.01',
                'Accept-Language': 'en-US,en;q=0.5',
                'Accept-Encoding': 'gzip, deflate, br, zstd',
                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
                'X-Requested-With': 'XMLHttpRequest',
                'Origin': 'https://sistemacremerj.com.br',
                'Connection': 'keep-alive',
                'Referer': 'https://sistemacremerj.com.br/crmonline/SifaOnLineServicosPublicosAction.do?metodo=servicoPublicoProfissionais',
                'Cookie': 'JSESSIONID=A1B011BBCE9FB7E94C0CB75D5C13BE22',
                'Sec-Fetch-Dest': 'empty',
                'Sec-Fetch-Mode': 'cors',
                'Sec-Fetch-Site': 'same-origin',
                'Priority': 'u=0',
                'Pragma': 'no-cache',
                'Cache-Control': 'no-cache'
            },
            body: new URLSearchParams({
                'paginaDesejada': '1',
                'metodo': 'buscaServicoPublicoProfissionais',
                'buscaNome': document.getElementById('name').value,
                'buscaRegistro': document.getElementById('crm').value,
                'buscaMunicipio': '',
                'buscaTipoInscricao': '',
                'buscaEspecialidade': '',
                'buscaAreaAtuacao': '',
                'situacaoRegistro': ''
            })
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();  // Treat the response as plain text (HTML)
            })
            .then(html => {
                // Parse the HTML response as a document
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');

                // Extract the 'resultadosDiv' element
                const resultadosDiv = doc.getElementById('resultadosDiv');

                if (resultadosDiv) {
                    // Get all elements with the class 'form-group' within 'resultadosDiv'
                    const formGroups = resultadosDiv.querySelectorAll('.form-group');

                    if (formGroups.length >= 2) {
                        // Display only the second element with class 'form-group'
                        resultDiv.innerHTML = formGroups[1].innerHTML;
                    } else {
                        resultDiv.innerHTML = "<strong>Error:</strong> Less than two '.form-group' elements found in 'resultadosDiv'.";
                    }
                } else {
                    resultDiv.innerHTML = "<strong>Error:</strong> 'resultadosDiv' not found in the response.";
                }
            })
            .catch(error => {
                resultDiv.innerHTML = `<strong>Error:</strong> ${error.message}`;
            });

        // Clear input fields after submission
        document.getElementById('name').value = '';
        document.getElementById('crm').value = '';
    });
});