const { translate } = require('google-translate-api-x');

async function test() {
    try {
        console.log('Testing translation...');
        const result = await translate('Hello world', { to: 'kn' });
        console.log('Result:', result.text);
    } catch (err) {
        console.error('Translation failed:', err);
    }
}

test();
