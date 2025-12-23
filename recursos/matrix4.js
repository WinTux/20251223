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
    translate(x, y, z) {
        const m = new Matrix4();
        m[12] = x;
        m[13] = y;
        m[14] = z;
        return this.multiply(m);
    }
    rotateZ(angle) {
        const c = Math.cos(angle);
        const s = Math.sin(angle);
        const m = new Matrix4();
        m[0] = c;   m[4] = -s;
        m[1] = s;   m[5] = c;
        return this.multiply(m);
    }
    scale(sx, sy, sz) {
        const m = new Matrix4();
        m[0] = sx;
        m[5] = sy;
        m[10] = sz;
        return this.multiply(m);
    }
    multiply(other) {
        const a = this;
        const b = other;
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