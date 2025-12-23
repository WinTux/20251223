const gl = canvas.getContext("webgl");

if (!gl) {
    console.error("WebGL no es compatible con este navegador.");
}
// shaders
const vertexShaderSource = `
    attribute vec4 aPosition;
    uniform mat4 uModelMatrix;
    void main() {
        gl_Position = uModelMatrix * aPosition;
    }
`;

const fragmentShaderSource = `
    precision mediump float;
    void main() {
        gl_FragColor = vec4(0.0, 0.5, 1.0, 1.0);
    }
`;

// función para compilar shaders
function compileShader(source, type) {
    const shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error("Error al compilar el shader:", gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
    }
    return shader;
}

const program = gl.createProgram();
gl.attachShader(program, compileShader(vertexShaderSource, gl.VERTEX_SHADER));
gl.attachShader(program, compileShader(fragmentShaderSource, gl.FRAGMENT_SHADER));
gl.linkProgram(program);
if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Error al enlazar el programa:", gl.getProgramInfoLog(program));
}
gl.useProgram(program);

// definir un triángulo
const vertices = new Float32Array([
    0.0,  0.5, 0.0,
   -0.5, -0.5, 0.0,
    0.5, -0.5, 0.0
]);

const vertexBuffer = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

const aPosition = gl.getAttribLocation(program, "aPosition");
gl.enableVertexAttribArray(aPosition);
gl.vertexAttribPointer(aPosition, 3, gl.FLOAT, false, 0, 0);

// obtener la ubicación de la matriz de modelo
const uModelMatrix = gl.getUniformLocation(program, "uModelMatrix");

// función para renderizar la escena
function render() {
   const tx = parseFloat(tx.value);
   const ty = parseFloat(ty.value);
   const rot = parseFloat(rot.value);
   const sx = parseFloat(sx.value);

   // crear la matriz de modelo
   const modelMatrix = new Matrix4()
   .translate(tx, ty, 0)
   .rotateZ(rot)
   .scale(sx, sx, 1);

   // pasar la matriz de modelo al shader
   gl.uniformMatrix4fv(uModelMatrix, false, modelMatrix);

   gl.viewport(0, 0, canvas.width, canvas.height);
   gl.clear(gl.COLOR_BUFFER_BIT);
   // dibujar el triángulo
   gl.drawArrays(gl.TRIANGLES, 0, 3);
   requestAnimationFrame(render);
}
requestAnimationFrame(render);