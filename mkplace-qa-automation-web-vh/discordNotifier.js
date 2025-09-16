// const fs = require('fs');
// const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
// const axios = require('axios');

// // Função para ler o arquivo JSON e processar os resultados dos testes
// async function processCucumberJson(filename) {
//     const cucumberResults = fs.readFileSync(filename, 'utf8');
//     const results = JSON.parse(cucumberResults);

//     let passed = 0;
//     let failed = 0;
//     let pending = 0;

//     results.forEach(feature => {
//         feature.elements.forEach(scenario => {
//             switch (scenario.steps[scenario.steps.length - 1].result.status) {
//                 case 'passed':
//                     passed++;
//                     break;
//                 case 'failed':
//                     failed++;
//                     break;
//                 default:
//                     pending++;
//             }
//         });
//     });

//     return { passed, failed, pending };
// }

// // Função para criar o gráfico de pizza e enviar mensagem com resumo
// async function createPieChartAndSendSummary(passed, failed, pending) {
//     const width = 400;
//     const height = 400;

//     const configuration = {
//         type: 'doughnut',
//         data: {
//             datasets: [{
//                 data: [passed, failed, pending],
//                 backgroundColor: ['green', 'red', 'yellow']
//             }],
//             labels: ['Passados', 'Falhados', 'Pendentes']
//         }
//     };

//     const chartCallback = (ChartJS) => {
//         ChartJS.defaults.plugins.legend.display = false;
//         ChartJS.defaults.plugins.tooltip.enabled = false;
//     };

//     const canvas = new ChartJSNodeCanvas({ width, height, chartCallback });

//     const buffer = await canvas.renderToBuffer(configuration);

//     const webhookUrl = 'https://discord.com/api/webhooks/1214632111798100018/lkAgcP6fbCXPhFwzbYmGK7HVcCgHLWtazWmPKY246X0pU9tgMCJ-fRQpyCOi87vAB1Tx';

//     try {
//         // Criar um Blob a partir do buffer
//         const blob = new Blob([buffer], { type: 'image/png' });

//         // Criar uma instância do FormData e adicionar o Blob
//         const formData = new FormData();
//         formData.append('file', blob, 'pie_chart.png');

//         // Adicionar resumo dos testes ao conteúdo da mensagem
//         const newAvatarUrl = 'https://cdn.sanity.io/images/o0o2tn5x/production/13b9c8412093e2f0cdb5495e1f59144967fa1664-512x512.jpg'
//         const content = `Gráfico de Pizza dos Testes:\n\nTestes Passados: ${passed}\nTestes Falhados: ${failed}\nTestes Pendentes: ${pending}`;

//         // Enviar a mensagem usando Axios
//         await axios.post(webhookUrl, formData, {
//             headers: {
//                 'Content-Type': 'multipart/form-data',
//             },
//             data: {
//                 content: content
//             },
//             avatar: newAvatarUrl
//         });

//         console.log('Mensagem enviada com sucesso para o Discord!');
//     } catch (error) {
//         console.error('Erro ao enviar mensagem para o Discord:', error);
//     }
// }

// // Dados dos testes
// const filename = './jsonlogs/log.json';

// // Processar os resultados dos testes e criar o gráfico de pizza
// processCucumberJson(filename).then(({ passed, failed, pending }) => {
//     createPieChartAndSendSummary(passed, failed, pending);
// }).catch(error => {
//     console.error('Erro ao processar o arquivo JSON:', error);
// });
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const fs = require('fs');
// const { ChartJSNodeCanvas } = require('chartjs-node-canvas');
// const axios = require('axios');
// const FormData = require('form-data');

// // Função para ler o arquivo JSON e processar os resultados dos testes
// async function processCucumberJson(filename) {
//     const cucumberResults = fs.readFileSync(filename, 'utf8');
//     const results = JSON.parse(cucumberResults);

//     let passed = 0;
//     let failed = 0;
//     let pending = 0;

//     results.forEach(feature => {
//         feature.elements.forEach(scenario => {
//             switch (scenario.steps[scenario.steps.length - 1].result.status) {
//                 case 'passed':
//                     passed++;
//                     break;
//                 case 'failed':
//                     failed++;
//                     break;
//                 default:
//                     pending++;
//             }
//         });
//     });

//     return { passed, failed, pending };
// }

// // Função para criar o gráfico de pizza e enviar mensagem com resumo
// async function createPieChartAndSendSummary(passed, failed, pending) {
//     const width = 400;
//     const height = 400;

//     const configuration = {
//         type: 'doughnut',
//         data: {
//             datasets: [{
//                 data: [passed, failed, pending],
//                 backgroundColor: ['green', 'red', 'yellow']
//             }],
//             labels: ['Passados', 'Falhados', 'Pendentes']
//         }
//     };

//     const chartCallback = (ChartJS) => {
//         ChartJS.defaults.plugins.legend.display = false;
//         ChartJS.defaults.plugins.tooltip.enabled = false;
//     };

//     const canvas = new ChartJSNodeCanvas({ width, height, chartCallback });

//     const buffer = await canvas.renderToBuffer(configuration);

//     const webhookUrl = 'https://discord.com/api/webhooks/1214632111798100018/lkAgcP6fbCXPhFwzbYmGK7HVcCgHLWtazWmPKY246X0pU9tgMCJ-fRQpyCOi87vAB1Tx';

//     try {
//         // Criar um Blob a partir do buffer
//         const formData = new FormData();
//         formData.append('file', buffer, 'pie_chart.png');

//         const emojiPassed = '✅';
//         const emojiFailed = '❌';
//         const emojiPending = '⏳';

//         // Adicionar resumo dos testes ao conteúdo da mensagem
//         const content = `Gráfico de Pizza dos Testes:\n\nTestes Passados: ${passed} ${emojiPassed}\nTestes Falhados: ${failed}  ${emojiFailed}\nTestes Pendentes: ${pending} ${emojiPending}`;
//         const newAvatarUrl = 'https://cdn.sanity.io/images/o0o2tn5x/production/13b9c8412093e2f0cdb5495e1f59144967fa1664-512x512.jpg'

//         // Enviar a mensagem usando Axios
//         await axios.post(webhookUrl, { content: content, avatar_url: newAvatarUrl,
//             headers: {
//                 ...formData.getHeaders(), // Configurar cabeçalhos corretamente para multipart/form-data
//             }
//             // Adicionar username e avatar_url se desejar alterar o nome ou avatar do bot
//             // username: 'Nome do Bot',
//             // avatar_url: 'URL do Avatar do Bot'
//         });

//         console.log('Mensagem enviada com sucesso para o Discord!');
//     } catch (error) {
//         console.error('Erro ao enviar mensagem para o Discord:', error);
//     }
// }

// // Dados dos testes
// const filename = './jsonlogs/log.json';

// // Processar os resultados dos testes e criar o gráfico de pizza
// processCucumberJson(filename).then(({ passed, failed, pending }) => {
//     createPieChartAndSendSummary(passed, failed, pending);
// }).catch(error => {
//     console.error('Erro ao processar o arquivo JSON:', error);
// });

// ------------------------------------------------------------------------------------------------------



// const fs = require('fs');
// const axios = require('axios');

// // Ler o arquivo JSON gerado pelo Cucumber
// const cucumberResults = fs.readFileSync('./jsonlogs/log.json', 'utf8');
// const results = JSON.parse(cucumberResults);

// // Função para enviar mensagem para o webhook do Discord
// async function sendMessageToDiscord(message) {
//     const newAvatarUrl = 'https://cdn.sanity.io/images/o0o2tn5x/production/13b9c8412093e2f0cdb5495e1f59144967fa1664-512x512.jpg'
//     const webhookUrl = 'https://discord.com/api/webhooks/1214632111798100018/lkAgcP6fbCXPhFwzbYmGK7HVcCgHLWtazWmPKY246X0pU9tgMCJ-fRQpyCOi87vAB1Tx'; // Substitua pelo URL do seu webhook
//     try {
//         await axios.post(webhookUrl, { content: message, avatar_url: newAvatarUrl });
//         console.log('Mensagem enviada para o Discord com sucesso.');
//     } catch (error) {
//         console.error('Erro ao enviar mensagem para o Discord:', error);
//     }
// }

// // Contadores de cenários
// let passed = 0;
// let failed = 0;
// let pending = 0;

// // Iterar sobre os elementos do arquivo JSON e contar os resultados
// results.forEach(feature => {
//     feature.elements.forEach(scenario => {
//         if (scenario.steps.every(step => step.result.status === 'passed')) {
//             passed++;
//         } else if (scenario.steps.some(step => step.result.status === 'failed')) {
//             failed++;
//         } else {
//             pending++;
//         }
//     });
// });

// // Calculando o total de cenários
// const total = passed + failed + pending;

// // Emojis para representar os resultados
// const emojiPassed = '✅';
// const emojiFailed = '❌';
// const emojiPending = '⏳';

// // Criar mensagem com os resultados e emojis
// const message = `
//     **Resultados dos testes Cypress:**
//     - **Total de cenários:** ${total} cenários
//     - ${emojiPassed}    Cenários passados: ${passed} cenários
//     - ${emojiFailed} Cenários falhados: ${failed} cenários
//     - ${emojiPending} Cenários pendentes: ${pending} cenários
// `;

// // Enviar mensagem para o Discord
// sendMessageToDiscord(message);



// fetch("https://discord.com/api/webhooks/1214632111798100018/lkAgcP6fbCXPhFwzbYmGK7HVcCgHLWtazWmPKY246X0pU9tgMCJ-fRQpyCOi87vAB1Tx", {
//     body: JSON.stringify({
//         username: `Cypress Bot Automation`,
//         content: `Testes finalizados com sucesso\n\nAcesse o link abaixo para visualizar o relatório de execução\n`,
//         avatar_url: `https://cdn.sanity.io/images/o0o2tn5x/production/13b9c8412093e2f0cdb5495e1f59144967fa1664-512x512.jpg`
//     }),
//     headers: {
//         "Content-Type": "application/json",
//     },
//     method: "POST",
// })
//     .then(function (res) {
//         console.log(res);
//     })
//     .catch(function (res) {
//         console.log(res);
//     });


const fs = require('fs');
const axios = require('axios');
const FormData = require('form-data');
const Chart = require('chart.js/auto');
const { createCanvas } = require('canvas');
const { EmbedBuilder, AttachmentBuilder } = require('discord.js');

const cucumberResults = fs.readFileSync('./jsonlogs/log.json', 'utf8');
const results = JSON.parse(cucumberResults);


// Contadores de cenários
let passed = 0;
let failed = 0;
let pending = 0;

// Iterar sobre os elementos do arquivo JSON e contar os resultados
results.forEach(feature => {
    feature.elements.forEach(scenario => {
        if (scenario.steps.every(step => step.result.status === 'passed')) {
            passed++;
        } else if (scenario.steps.some(step => step.result.status === 'failed')) {
            failed++;
        } else {
            pending++;
        }
    });
});

function drawDonutChart(successPercentage, failurePercentage) {
    const width = 300;
    const height = 300;
    const canvas = createCanvas(width, height);
    const ctx = canvas.getContext('2d');

    new Chart(ctx, {
        type: 'doughnut',
        data: {
            datasets: [{
                data: [successPercentage, failurePercentage],
                backgroundColor: ['green', 'red'],
                borderColor: '#2b2d31'
            }]
        }
    });

    const buffer = canvas.toBuffer('image/png');
    fs.writeFileSync('./chart.png', buffer);
}

// Calculando o total de cenários
const total = passed + failed + pending;

function formatDuration(totalDurationInSeconds) {
    const minutes = Math.floor(totalDurationInSeconds / 60);
    const seconds = Math.floor(totalDurationInSeconds % 60);
    return `${minutes}m${seconds}s`;
}

async function sendDiscordWebhook() {
    try {
        const data = await fs.promises.readFile('./jsonlogs/log.json', 'utf8');
        const resultData = JSON.parse(data);
        const attachFiles = [];
        let totalDuration = 0;
        let totalCenarios = 0;
        let totalSuites = 0;

        resultData.forEach(feature => {
            feature.elements.forEach(scenario => {
                if (scenario.id !== 0) {
                    totalCenarios++
                }
                scenario.steps.forEach(step => {
                    // Adicionar a duração do passo à duração total
                    totalDuration += step.result.duration;
                });
            });
        });

        resultData.forEach(feature => {
            if (feature.name !== 0) {
                totalSuites++
            }
        });

        const totalSuite = totalSuites
        const totalScenarios = totalCenarios
        const totalDurationInSeconds = totalDuration / 1000000000;
        const formattedDuration = formatDuration(totalDurationInSeconds);

        const testPassesCount = passed;
        const testPendingCount = pending;
        const testFailuresCount = failed;

        const successPercentage = (testPassesCount / total) * 100;
        const failurePercentage = (testFailuresCount / total) * 100;

        drawDonutChart(successPercentage, failurePercentage);

        new AttachmentBuilder('./chart.png');
        attachFiles.push('./chart.png');
        const embed = new EmbedBuilder()
            .setColor(0x5eff00)
            .setTitle('Tests Results Report - Victor Hugo')
            .setAuthor({
                name: 'Cypress Discord Reporter',
                iconURL: 'https://i.imgur.com/KRxtcos.jpeg',
                url: 'https://github.com/mkplace/mkplace-qa-automation-web-vh/actions/workflows/cypress_run.yml'
            })
            .addFields(
                { name: 'Duration :clock4:', value: formattedDuration.toString(), inline: true },
                { name: 'Suites :card_box:', value: totalSuite.toString(), inline: true },
                { name: 'Tests :bookmark_tabs:', value: totalScenarios.toString(), inline: true },
            )
            .addFields(
                { name: 'Passes :white_check_mark:', value: testPassesCount.toString(), inline: true },
                { name: 'Pending :hourglass_flowing_sand:', value: testPendingCount.toString(), inline: true },
                { name: 'Failures :x:', value: testFailuresCount.toString(), inline: true },
            )
            .setThumbnail('attachment://chart.png')
            .setTimestamp();

        if (testFailuresCount > 0) {
            embed.setColor("Red");
        } else {
            embed.setColor("Green");
        }

        const webhookDiscord = 'https://discord.com/api/webhooks/1214632111798100018/lkAgcP6fbCXPhFwzbYmGK7HVcCgHLWtazWmPKY246X0pU9tgMCJ-fRQpyCOi87vAB1Tx'
        const form = new FormData();
        form.append('payload_json', JSON.stringify({ embeds: [embed] }));

        for (let index = 0; index < attachFiles.length; index++) {
            const fileStream = fs.createReadStream(attachFiles[index]);
            form.append(`file${index}`, fileStream);
        }

        try {
            await axios.post(webhookDiscord, form, {
                headers: {
                    ...form.getHeaders(),
                },
            });
        } catch (error) {
            console.error('Error:', error.message);
        }

    } catch (err) {
        console.error('Error reading or parsing file:', err);
    } finally {
        fs.unlink('./chart.png', (err) => {
            if (err) {
                console.error('Error deleting png file:', err);
            }
        });
    }
}

sendDiscordWebhook()