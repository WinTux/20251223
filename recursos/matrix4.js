class Matrix4 extends Float32Array {
    constructor() {
        super(16);
        this.identity();
    }
    identity() {
        for (let i = 0; i < 16; i++)
            this[i] = (i % 5 === 0) ? 1 : 0;
        return this;
    }
    trasladar(x, y, z) {
        const m = new Matrix4();
        m[12] = x;
        m[13] = y;
        m[14] = z;
        return this.multiplicar(m);
    }
    rotarZ(angulo) {
        const c = Math.cos(angulo);
        const s = Math.sin(angulo);
        const m = new Matrix4();
        m[0] = c;   m[4] = -s;
        m[1] = s;   m[5] = c;
        return this.multiplicar(m);
    }
    escala(esx, esy, esz) {
        const m = new Matrix4();
        m[0] = esx;
        m[5] = esy;
        m[10] = esz;
        return this.multiplicar(m);
    }
    multiplicar(otro) {
        const a = this;
        const b = otro;
        const result = new Matrix4();
        for (let row = 0; row < 4; row++) {
            for (let col = 0; col < 4; col++) {
                result[row * 4 + col] =
                    a[row * 4 + 0] * b[0 * 4 + col] +
                    a[row * 4 + 1] * b[1 * 4 + col] +
                    a[row * 4 + 2] * b[2 * 4 + col] +
                    a[row * 4 + 3] * b[3 * 4 + col];
            }
        }
        return result;
    }
}