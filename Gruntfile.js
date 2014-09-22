module.exports = function(grunt) {
    // Configuración de Grunt
    grunt.initConfig({
        // Configuración para proyectos y tareas.
        // uglify
        uglify: {
            options: {
                mangle: false,
                compress: {
                    drop_console: true
                }
            },
            js: {
                files: [{
                    cwd: 'static/js',  // ruta de nuestro javascript fuente
                    expand: true,    // ingresar a las subcarpetas
                    src: '*.js',     // patrón relativo a cwd
                    dest: 'static/js/min/'  // destino de los archivos compresos
                }]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    //grunt.loadNpmTasks('grunt-contrib-connect');
    //grunt.loadNpmTasks('grunt-contrib-watch');

    //grunt.registerTask('default', ['uglify','connect', 'watch']);
    grunt.registerTask('default', ['uglify']);
};