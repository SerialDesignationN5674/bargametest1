// totally not stealing from ad :)
class BigNum {
  constructor(m, e) {
    this.m = m; // 1 ≤ m < 10
    this.e = e;
    this.normalize();
  }

  normalize() {
    while (this.m >= 10) {
      this.m /= 10;
      this.e += 1;
    }
    while (this.m < 1 && this.m !== 0) {
      this.m *= 10;
      this.e -= 1;
    }
  }

  multiply(other) {
    return new BigNum(
      this.m * other.m,
      this.e + other.e
    );
  }

  add(other) {
    if (this.e !== other.e) {
      const diff = this.e - other.e;
      if (diff > 20) return this;       // soft ignore
      if (diff < -20) return other;
      return new BigNum(
        this.m + other.m / Math.pow(10, diff),
        this.e
      );
    }
    return new BigNum(this.m + other.m, this.e);
  }
  toString() {
    return this.m.toFixed(2) + "e" + this.e;
  }
}
export default BigNum;
// put this so it updates the site
