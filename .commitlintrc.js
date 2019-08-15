module.exports = {
    extends: ['@commitlint/config-conventional'],
    // 暂定type、scope和subject不能为空
    rules: {
        'type-enum': [
            2,
            'always',
            [
                'feat',
                'fix',
                'docs',
                'style',
                'refactor',
                'perf',
                'test',
                'build',
                'ci',
                'chore',
                'revert'
            ]
        ],
        'scope-empty': [2, 'never'],
        'subject-empty': [2, 'never']
    }
};
