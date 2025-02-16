/**
 * ml - Machine learning tools
 * @version v3.6.0
 * @link https://github.com/mljs/ml
 * @license MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["ML"] = factory();
	else
		root["ML"] = factory();
})(typeof self !== 'undefined' ? self : this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 43);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/ml-array-rescale/lib-es6/index.js
var lib_es6 = __webpack_require__(13);

// CONCATENATED MODULE: ./node_modules/ml-matrix/src/dc/lu.js

/**
 * @class LuDecomposition
 * @link https://github.com/lutzroeder/Mapack/blob/master/Source/LuDecomposition.cs
 * @param {Matrix} matrix
 */

class lu_LuDecomposition {
  constructor(matrix) {
    matrix = WrapperMatrix2D_WrapperMatrix2D.checkMatrix(matrix);
    var lu = matrix.clone();
    var rows = lu.rows;
    var columns = lu.columns;
    var pivotVector = new Array(rows);
    var pivotSign = 1;
    var i, j, k, p, s, t, v;
    var LUcolj, kmax;

    for (i = 0; i < rows; i++) {
      pivotVector[i] = i;
    }

    LUcolj = new Array(rows);

    for (j = 0; j < columns; j++) {
      for (i = 0; i < rows; i++) {
        LUcolj[i] = lu.get(i, j);
      }

      for (i = 0; i < rows; i++) {
        kmax = Math.min(i, j);
        s = 0;

        for (k = 0; k < kmax; k++) {
          s += lu.get(i, k) * LUcolj[k];
        }

        LUcolj[i] -= s;
        lu.set(i, j, LUcolj[i]);
      }

      p = j;

      for (i = j + 1; i < rows; i++) {
        if (Math.abs(LUcolj[i]) > Math.abs(LUcolj[p])) {
          p = i;
        }
      }

      if (p !== j) {
        for (k = 0; k < columns; k++) {
          t = lu.get(p, k);
          lu.set(p, k, lu.get(j, k));
          lu.set(j, k, t);
        }

        v = pivotVector[p];
        pivotVector[p] = pivotVector[j];
        pivotVector[j] = v;
        pivotSign = -pivotSign;
      }

      if (j < rows && lu.get(j, j) !== 0) {
        for (i = j + 1; i < rows; i++) {
          lu.set(i, j, lu.get(i, j) / lu.get(j, j));
        }
      }
    }

    this.LU = lu;
    this.pivotVector = pivotVector;
    this.pivotSign = pivotSign;
  }
  /**
   *
   * @return {boolean}
   */


  isSingular() {
    var data = this.LU;
    var col = data.columns;

    for (var j = 0; j < col; j++) {
      if (data[j][j] === 0) {
        return true;
      }
    }

    return false;
  }
  /**
   *
   * @param {Matrix} value
   * @return {Matrix}
   */


  solve(value) {
    value = matrix_Matrix.checkMatrix(value);
    var lu = this.LU;
    var rows = lu.rows;

    if (rows !== value.rows) {
      throw new Error('Invalid matrix dimensions');
    }

    if (this.isSingular()) {
      throw new Error('LU matrix is singular');
    }

    var count = value.columns;
    var X = value.subMatrixRow(this.pivotVector, 0, count - 1);
    var columns = lu.columns;
    var i, j, k;

    for (k = 0; k < columns; k++) {
      for (i = k + 1; i < columns; i++) {
        for (j = 0; j < count; j++) {
          X[i][j] -= X[k][j] * lu[i][k];
        }
      }
    }

    for (k = columns - 1; k >= 0; k--) {
      for (j = 0; j < count; j++) {
        X[k][j] /= lu[k][k];
      }

      for (i = 0; i < k; i++) {
        for (j = 0; j < count; j++) {
          X[i][j] -= X[k][j] * lu[i][k];
        }
      }
    }

    return X;
  }
  /**
   *
   * @return {number}
   */


  get determinant() {
    var data = this.LU;

    if (!data.isSquare()) {
      throw new Error('Matrix must be square');
    }

    var determinant = this.pivotSign;
    var col = data.columns;

    for (var j = 0; j < col; j++) {
      determinant *= data[j][j];
    }

    return determinant;
  }
  /**
   *
   * @return {Matrix}
   */


  get lowerTriangularMatrix() {
    var data = this.LU;
    var rows = data.rows;
    var columns = data.columns;
    var X = new matrix_Matrix(rows, columns);

    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        if (i > j) {
          X[i][j] = data[i][j];
        } else if (i === j) {
          X[i][j] = 1;
        } else {
          X[i][j] = 0;
        }
      }
    }

    return X;
  }
  /**
   *
   * @return {Matrix}
   */


  get upperTriangularMatrix() {
    var data = this.LU;
    var rows = data.rows;
    var columns = data.columns;
    var X = new matrix_Matrix(rows, columns);

    for (var i = 0; i < rows; i++) {
      for (var j = 0; j < columns; j++) {
        if (i <= j) {
          X[i][j] = data[i][j];
        } else {
          X[i][j] = 0;
        }
      }
    }

    return X;
  }
  /**
   *
   * @return {Array<number>}
   */


  get pivotPermutationVector() {
    return this.pivotVector.slice();
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/dc/util.js
function hypotenuse(a, b) {
  var r = 0;

  if (Math.abs(a) > Math.abs(b)) {
    r = b / a;
    return Math.abs(a) * Math.sqrt(1 + r * r);
  }

  if (b !== 0) {
    r = a / b;
    return Math.abs(b) * Math.sqrt(1 + r * r);
  }

  return 0;
}
function getFilled2DArray(rows, columns, value) {
  var array = new Array(rows);

  for (var i = 0; i < rows; i++) {
    array[i] = new Array(columns);

    for (var j = 0; j < columns; j++) {
      array[i][j] = value;
    }
  }

  return array;
}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/dc/svd.js


/**
 * @class SingularValueDecomposition
 * @see https://github.com/accord-net/framework/blob/development/Sources/Accord.Math/Decompositions/SingularValueDecomposition.cs
 * @param {Matrix} value
 * @param {object} [options]
 * @param {boolean} [options.computeLeftSingularVectors=true]
 * @param {boolean} [options.computeRightSingularVectors=true]
 * @param {boolean} [options.autoTranspose=false]
 */

class svd_SingularValueDecomposition {
  constructor(value) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    value = WrapperMatrix2D_WrapperMatrix2D.checkMatrix(value);
    var m = value.rows;
    var n = value.columns;
    const {
      computeLeftSingularVectors = true,
      computeRightSingularVectors = true,
      autoTranspose = false
    } = options;
    var wantu = Boolean(computeLeftSingularVectors);
    var wantv = Boolean(computeRightSingularVectors);
    var swapped = false;
    var a;

    if (m < n) {
      if (!autoTranspose) {
        a = value.clone(); // eslint-disable-next-line no-console

        console.warn('Computing SVD on a matrix with more columns than rows. Consider enabling autoTranspose');
      } else {
        a = value.transpose();
        m = a.rows;
        n = a.columns;
        swapped = true;
        var aux = wantu;
        wantu = wantv;
        wantv = aux;
      }
    } else {
      a = value.clone();
    }

    var nu = Math.min(m, n);
    var ni = Math.min(m + 1, n);
    var s = new Array(ni);
    var U = getFilled2DArray(m, nu, 0);
    var V = getFilled2DArray(n, n, 0);
    var e = new Array(n);
    var work = new Array(m);
    var si = new Array(ni);

    for (let i = 0; i < ni; i++) si[i] = i;

    var nct = Math.min(m - 1, n);
    var nrt = Math.max(0, Math.min(n - 2, m));
    var mrc = Math.max(nct, nrt);

    for (let k = 0; k < mrc; k++) {
      if (k < nct) {
        s[k] = 0;

        for (let i = k; i < m; i++) {
          s[k] = hypotenuse(s[k], a[i][k]);
        }

        if (s[k] !== 0) {
          if (a[k][k] < 0) {
            s[k] = -s[k];
          }

          for (let i = k; i < m; i++) {
            a[i][k] /= s[k];
          }

          a[k][k] += 1;
        }

        s[k] = -s[k];
      }

      for (let j = k + 1; j < n; j++) {
        if (k < nct && s[k] !== 0) {
          let t = 0;

          for (let i = k; i < m; i++) {
            t += a[i][k] * a[i][j];
          }

          t = -t / a[k][k];

          for (let i = k; i < m; i++) {
            a[i][j] += t * a[i][k];
          }
        }

        e[j] = a[k][j];
      }

      if (wantu && k < nct) {
        for (let i = k; i < m; i++) {
          U[i][k] = a[i][k];
        }
      }

      if (k < nrt) {
        e[k] = 0;

        for (let i = k + 1; i < n; i++) {
          e[k] = hypotenuse(e[k], e[i]);
        }

        if (e[k] !== 0) {
          if (e[k + 1] < 0) {
            e[k] = 0 - e[k];
          }

          for (let i = k + 1; i < n; i++) {
            e[i] /= e[k];
          }

          e[k + 1] += 1;
        }

        e[k] = -e[k];

        if (k + 1 < m && e[k] !== 0) {
          for (let i = k + 1; i < m; i++) {
            work[i] = 0;
          }

          for (let i = k + 1; i < m; i++) {
            for (let j = k + 1; j < n; j++) {
              work[i] += e[j] * a[i][j];
            }
          }

          for (let j = k + 1; j < n; j++) {
            let t = -e[j] / e[k + 1];

            for (let i = k + 1; i < m; i++) {
              a[i][j] += t * work[i];
            }
          }
        }

        if (wantv) {
          for (let i = k + 1; i < n; i++) {
            V[i][k] = e[i];
          }
        }
      }
    }

    let p = Math.min(n, m + 1);

    if (nct < n) {
      s[nct] = a[nct][nct];
    }

    if (m < p) {
      s[p - 1] = 0;
    }

    if (nrt + 1 < p) {
      e[nrt] = a[nrt][p - 1];
    }

    e[p - 1] = 0;

    if (wantu) {
      for (let j = nct; j < nu; j++) {
        for (let i = 0; i < m; i++) {
          U[i][j] = 0;
        }

        U[j][j] = 1;
      }

      for (let k = nct - 1; k >= 0; k--) {
        if (s[k] !== 0) {
          for (let j = k + 1; j < nu; j++) {
            let t = 0;

            for (let i = k; i < m; i++) {
              t += U[i][k] * U[i][j];
            }

            t = -t / U[k][k];

            for (let i = k; i < m; i++) {
              U[i][j] += t * U[i][k];
            }
          }

          for (let i = k; i < m; i++) {
            U[i][k] = -U[i][k];
          }

          U[k][k] = 1 + U[k][k];

          for (let i = 0; i < k - 1; i++) {
            U[i][k] = 0;
          }
        } else {
          for (let i = 0; i < m; i++) {
            U[i][k] = 0;
          }

          U[k][k] = 1;
        }
      }
    }

    if (wantv) {
      for (let k = n - 1; k >= 0; k--) {
        if (k < nrt && e[k] !== 0) {
          for (let j = k + 1; j < n; j++) {
            let t = 0;

            for (let i = k + 1; i < n; i++) {
              t += V[i][k] * V[i][j];
            }

            t = -t / V[k + 1][k];

            for (let i = k + 1; i < n; i++) {
              V[i][j] += t * V[i][k];
            }
          }
        }

        for (let i = 0; i < n; i++) {
          V[i][k] = 0;
        }

        V[k][k] = 1;
      }
    }

    var pp = p - 1;
    var iter = 0;
    var eps = Number.EPSILON;

    while (p > 0) {
      let k, kase;

      for (k = p - 2; k >= -1; k--) {
        if (k === -1) {
          break;
        }

        const alpha = Number.MIN_VALUE + eps * Math.abs(s[k] + Math.abs(s[k + 1]));

        if (Math.abs(e[k]) <= alpha || Number.isNaN(e[k])) {
          e[k] = 0;
          break;
        }
      }

      if (k === p - 2) {
        kase = 4;
      } else {
        let ks;

        for (ks = p - 1; ks >= k; ks--) {
          if (ks === k) {
            break;
          }

          let t = (ks !== p ? Math.abs(e[ks]) : 0) + (ks !== k + 1 ? Math.abs(e[ks - 1]) : 0);

          if (Math.abs(s[ks]) <= eps * t) {
            s[ks] = 0;
            break;
          }
        }

        if (ks === k) {
          kase = 3;
        } else if (ks === p - 1) {
          kase = 1;
        } else {
          kase = 2;
          k = ks;
        }
      }

      k++;

      switch (kase) {
        case 1:
          {
            let f = e[p - 2];
            e[p - 2] = 0;

            for (let j = p - 2; j >= k; j--) {
              let t = hypotenuse(s[j], f);
              let cs = s[j] / t;
              let sn = f / t;
              s[j] = t;

              if (j !== k) {
                f = -sn * e[j - 1];
                e[j - 1] = cs * e[j - 1];
              }

              if (wantv) {
                for (let i = 0; i < n; i++) {
                  t = cs * V[i][j] + sn * V[i][p - 1];
                  V[i][p - 1] = -sn * V[i][j] + cs * V[i][p - 1];
                  V[i][j] = t;
                }
              }
            }

            break;
          }

        case 2:
          {
            let f = e[k - 1];
            e[k - 1] = 0;

            for (let j = k; j < p; j++) {
              let t = hypotenuse(s[j], f);
              let cs = s[j] / t;
              let sn = f / t;
              s[j] = t;
              f = -sn * e[j];
              e[j] = cs * e[j];

              if (wantu) {
                for (let i = 0; i < m; i++) {
                  t = cs * U[i][j] + sn * U[i][k - 1];
                  U[i][k - 1] = -sn * U[i][j] + cs * U[i][k - 1];
                  U[i][j] = t;
                }
              }
            }

            break;
          }

        case 3:
          {
            const scale = Math.max(Math.abs(s[p - 1]), Math.abs(s[p - 2]), Math.abs(e[p - 2]), Math.abs(s[k]), Math.abs(e[k]));
            const sp = s[p - 1] / scale;
            const spm1 = s[p - 2] / scale;
            const epm1 = e[p - 2] / scale;
            const sk = s[k] / scale;
            const ek = e[k] / scale;
            const b = ((spm1 + sp) * (spm1 - sp) + epm1 * epm1) / 2;
            const c = sp * epm1 * (sp * epm1);
            let shift = 0;

            if (b !== 0 || c !== 0) {
              if (b < 0) {
                shift = 0 - Math.sqrt(b * b + c);
              } else {
                shift = Math.sqrt(b * b + c);
              }

              shift = c / (b + shift);
            }

            let f = (sk + sp) * (sk - sp) + shift;
            let g = sk * ek;

            for (let j = k; j < p - 1; j++) {
              let t = hypotenuse(f, g);
              if (t === 0) t = Number.MIN_VALUE;
              let cs = f / t;
              let sn = g / t;

              if (j !== k) {
                e[j - 1] = t;
              }

              f = cs * s[j] + sn * e[j];
              e[j] = cs * e[j] - sn * s[j];
              g = sn * s[j + 1];
              s[j + 1] = cs * s[j + 1];

              if (wantv) {
                for (let i = 0; i < n; i++) {
                  t = cs * V[i][j] + sn * V[i][j + 1];
                  V[i][j + 1] = -sn * V[i][j] + cs * V[i][j + 1];
                  V[i][j] = t;
                }
              }

              t = hypotenuse(f, g);
              if (t === 0) t = Number.MIN_VALUE;
              cs = f / t;
              sn = g / t;
              s[j] = t;
              f = cs * e[j] + sn * s[j + 1];
              s[j + 1] = -sn * e[j] + cs * s[j + 1];
              g = sn * e[j + 1];
              e[j + 1] = cs * e[j + 1];

              if (wantu && j < m - 1) {
                for (let i = 0; i < m; i++) {
                  t = cs * U[i][j] + sn * U[i][j + 1];
                  U[i][j + 1] = -sn * U[i][j] + cs * U[i][j + 1];
                  U[i][j] = t;
                }
              }
            }

            e[p - 2] = f;
            iter = iter + 1;
            break;
          }

        case 4:
          {
            if (s[k] <= 0) {
              s[k] = s[k] < 0 ? -s[k] : 0;

              if (wantv) {
                for (let i = 0; i <= pp; i++) {
                  V[i][k] = -V[i][k];
                }
              }
            }

            while (k < pp) {
              if (s[k] >= s[k + 1]) {
                break;
              }

              let t = s[k];
              s[k] = s[k + 1];
              s[k + 1] = t;

              if (wantv && k < n - 1) {
                for (let i = 0; i < n; i++) {
                  t = V[i][k + 1];
                  V[i][k + 1] = V[i][k];
                  V[i][k] = t;
                }
              }

              if (wantu && k < m - 1) {
                for (let i = 0; i < m; i++) {
                  t = U[i][k + 1];
                  U[i][k + 1] = U[i][k];
                  U[i][k] = t;
                }
              }

              k++;
            }

            iter = 0;
            p--;
            break;
          }
        // no default
      }
    }

    if (swapped) {
      var tmp = V;
      V = U;
      U = tmp;
    }

    this.m = m;
    this.n = n;
    this.s = s;
    this.U = U;
    this.V = V;
  }
  /**
   * Solve a problem of least square (Ax=b) by using the SVD. Useful when A is singular. When A is not singular, it would be better to use qr.solve(value).
   * Example : We search to approximate x, with A matrix shape m*n, x vector size n, b vector size m (m > n). We will use :
   * var svd = SingularValueDecomposition(A);
   * var x = svd.solve(b);
   * @param {Matrix} value - Matrix 1D which is the vector b (in the equation Ax = b)
   * @return {Matrix} - The vector x
   */


  solve(value) {
    var Y = value;
    var e = this.threshold;
    var scols = this.s.length;
    var Ls = matrix_Matrix.zeros(scols, scols);

    for (let i = 0; i < scols; i++) {
      if (Math.abs(this.s[i]) <= e) {
        Ls[i][i] = 0;
      } else {
        Ls[i][i] = 1 / this.s[i];
      }
    }

    var U = this.U;
    var V = this.rightSingularVectors;
    var VL = V.mmul(Ls);
    var vrows = V.rows;
    var urows = U.length;
    var VLU = matrix_Matrix.zeros(vrows, urows);

    for (let i = 0; i < vrows; i++) {
      for (let j = 0; j < urows; j++) {
        let sum = 0;

        for (let k = 0; k < scols; k++) {
          sum += VL[i][k] * U[j][k];
        }

        VLU[i][j] = sum;
      }
    }

    return VLU.mmul(Y);
  }
  /**
   *
   * @param {Array<number>} value
   * @return {Matrix}
   */


  solveForDiagonal(value) {
    return this.solve(matrix_Matrix.diag(value));
  }
  /**
   * Get the inverse of the matrix. We compute the inverse of a matrix using SVD when this matrix is singular or ill-conditioned. Example :
   * var svd = SingularValueDecomposition(A);
   * var inverseA = svd.inverse();
   * @return {Matrix} - The approximation of the inverse of the matrix
   */


  inverse() {
    var V = this.V;
    var e = this.threshold;
    var vrows = V.length;
    var vcols = V[0].length;
    var X = new matrix_Matrix(vrows, this.s.length);

    for (let i = 0; i < vrows; i++) {
      for (let j = 0; j < vcols; j++) {
        if (Math.abs(this.s[j]) > e) {
          X[i][j] = V[i][j] / this.s[j];
        } else {
          X[i][j] = 0;
        }
      }
    }

    var U = this.U;
    var urows = U.length;
    var ucols = U[0].length;
    var Y = new matrix_Matrix(vrows, urows);

    for (let i = 0; i < vrows; i++) {
      for (let j = 0; j < urows; j++) {
        let sum = 0;

        for (let k = 0; k < ucols; k++) {
          sum += X[i][k] * U[j][k];
        }

        Y[i][j] = sum;
      }
    }

    return Y;
  }
  /**
   *
   * @return {number}
   */


  get condition() {
    return this.s[0] / this.s[Math.min(this.m, this.n) - 1];
  }
  /**
   *
   * @return {number}
   */


  get norm2() {
    return this.s[0];
  }
  /**
   *
   * @return {number}
   */


  get rank() {
    var tol = Math.max(this.m, this.n) * this.s[0] * Number.EPSILON;
    var r = 0;
    var s = this.s;

    for (var i = 0, ii = s.length; i < ii; i++) {
      if (s[i] > tol) {
        r++;
      }
    }

    return r;
  }
  /**
   *
   * @return {Array<number>}
   */


  get diagonal() {
    return this.s;
  }
  /**
   *
   * @return {number}
   */


  get threshold() {
    return Number.EPSILON / 2 * Math.max(this.m, this.n) * this.s[0];
  }
  /**
   *
   * @return {Matrix}
   */


  get leftSingularVectors() {
    if (!matrix_Matrix.isMatrix(this.U)) {
      this.U = new matrix_Matrix(this.U);
    }

    return this.U;
  }
  /**
   *
   * @return {Matrix}
   */


  get rightSingularVectors() {
    if (!matrix_Matrix.isMatrix(this.V)) {
      this.V = new matrix_Matrix(this.V);
    }

    return this.V;
  }
  /**
   *
   * @return {Matrix}
   */


  get diagonalMatrix() {
    return matrix_Matrix.diag(this.s);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/util.js

/**
 * @private
 * Check that a row index is not out of bounds
 * @param {Matrix} matrix
 * @param {number} index
 * @param {boolean} [outer]
 */

function checkRowIndex(matrix, index, outer) {
  var max = outer ? matrix.rows : matrix.rows - 1;

  if (index < 0 || index > max) {
    throw new RangeError('Row index out of range');
  }
}
/**
 * @private
 * Check that a column index is not out of bounds
 * @param {Matrix} matrix
 * @param {number} index
 * @param {boolean} [outer]
 */

function checkColumnIndex(matrix, index, outer) {
  var max = outer ? matrix.columns : matrix.columns - 1;

  if (index < 0 || index > max) {
    throw new RangeError('Column index out of range');
  }
}
/**
 * @private
 * Check that the provided vector is an array with the right length
 * @param {Matrix} matrix
 * @param {Array|Matrix} vector
 * @return {Array}
 * @throws {RangeError}
 */

function checkRowVector(matrix, vector) {
  if (vector.to1DArray) {
    vector = vector.to1DArray();
  }

  if (vector.length !== matrix.columns) {
    throw new RangeError('vector size must be the same as the number of columns');
  }

  return vector;
}
/**
 * @private
 * Check that the provided vector is an array with the right length
 * @param {Matrix} matrix
 * @param {Array|Matrix} vector
 * @return {Array}
 * @throws {RangeError}
 */

function checkColumnVector(matrix, vector) {
  if (vector.to1DArray) {
    vector = vector.to1DArray();
  }

  if (vector.length !== matrix.rows) {
    throw new RangeError('vector size must be the same as the number of rows');
  }

  return vector;
}
function checkIndices(matrix, rowIndices, columnIndices) {
  return {
    row: checkRowIndices(matrix, rowIndices),
    column: checkColumnIndices(matrix, columnIndices)
  };
}
function checkRowIndices(matrix, rowIndices) {
  if (typeof rowIndices !== 'object') {
    throw new TypeError('unexpected type for row indices');
  }

  var rowOut = rowIndices.some(r => {
    return r < 0 || r >= matrix.rows;
  });

  if (rowOut) {
    throw new RangeError('row indices are out of range');
  }

  if (!Array.isArray(rowIndices)) rowIndices = Array.from(rowIndices);
  return rowIndices;
}
function checkColumnIndices(matrix, columnIndices) {
  if (typeof columnIndices !== 'object') {
    throw new TypeError('unexpected type for column indices');
  }

  var columnOut = columnIndices.some(c => {
    return c < 0 || c >= matrix.columns;
  });

  if (columnOut) {
    throw new RangeError('column indices are out of range');
  }

  if (!Array.isArray(columnIndices)) columnIndices = Array.from(columnIndices);
  return columnIndices;
}
function checkRange(matrix, startRow, endRow, startColumn, endColumn) {
  if (arguments.length !== 5) {
    throw new RangeError('expected 4 arguments');
  }

  checkNumber('startRow', startRow);
  checkNumber('endRow', endRow);
  checkNumber('startColumn', startColumn);
  checkNumber('endColumn', endColumn);

  if (startRow > endRow || startColumn > endColumn || startRow < 0 || startRow >= matrix.rows || endRow < 0 || endRow >= matrix.rows || startColumn < 0 || startColumn >= matrix.columns || endColumn < 0 || endColumn >= matrix.columns) {
    throw new RangeError('Submatrix indices are out of range');
  }
}
function getRange(from, to) {
  var arr = new Array(to - from + 1);

  for (var i = 0; i < arr.length; i++) {
    arr[i] = from + i;
  }

  return arr;
}
function sumByRow(matrix) {
  var sum = matrix_Matrix.zeros(matrix.rows, 1);

  for (var i = 0; i < matrix.rows; ++i) {
    for (var j = 0; j < matrix.columns; ++j) {
      sum.set(i, 0, sum.get(i, 0) + matrix.get(i, j));
    }
  }

  return sum;
}
function sumByColumn(matrix) {
  var sum = matrix_Matrix.zeros(1, matrix.columns);

  for (var i = 0; i < matrix.rows; ++i) {
    for (var j = 0; j < matrix.columns; ++j) {
      sum.set(0, j, sum.get(0, j) + matrix.get(i, j));
    }
  }

  return sum;
}
function sumAll(matrix) {
  var v = 0;

  for (var i = 0; i < matrix.rows; i++) {
    for (var j = 0; j < matrix.columns; j++) {
      v += matrix.get(i, j);
    }
  }

  return v;
}

function checkNumber(name, value) {
  if (typeof value !== 'number') {
    throw new TypeError("".concat(name, " must be a number"));
  }
}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/views/base.js


class base_BaseView extends AbstractMatrix() {
  constructor(matrix, rows, columns) {
    super();
    this.matrix = matrix;
    this.rows = rows;
    this.columns = columns;
  }

  static get [Symbol.species]() {
    return matrix_Matrix;
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/views/transpose.js

class transpose_MatrixTransposeView extends base_BaseView {
  constructor(matrix) {
    super(matrix, matrix.columns, matrix.rows);
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(columnIndex, rowIndex, value);
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(columnIndex, rowIndex);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/views/row.js

class row_MatrixRowView extends base_BaseView {
  constructor(matrix, row) {
    super(matrix, 1, matrix.columns);
    this.row = row;
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(this.row, columnIndex, value);
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(this.row, columnIndex);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/views/sub.js


class sub_MatrixSubView extends base_BaseView {
  constructor(matrix, startRow, endRow, startColumn, endColumn) {
    checkRange(matrix, startRow, endRow, startColumn, endColumn);
    super(matrix, endRow - startRow + 1, endColumn - startColumn + 1);
    this.startRow = startRow;
    this.startColumn = startColumn;
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(this.startRow + rowIndex, this.startColumn + columnIndex, value);
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(this.startRow + rowIndex, this.startColumn + columnIndex);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/views/selection.js


class selection_MatrixSelectionView extends base_BaseView {
  constructor(matrix, rowIndices, columnIndices) {
    var indices = checkIndices(matrix, rowIndices, columnIndices);
    super(matrix, indices.row.length, indices.column.length);
    this.rowIndices = indices.row;
    this.columnIndices = indices.column;
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(this.rowIndices[rowIndex], this.columnIndices[columnIndex], value);
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(this.rowIndices[rowIndex], this.columnIndices[columnIndex]);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/views/rowSelection.js


class rowSelection_MatrixRowSelectionView extends base_BaseView {
  constructor(matrix, rowIndices) {
    rowIndices = checkRowIndices(matrix, rowIndices);
    super(matrix, rowIndices.length, matrix.columns);
    this.rowIndices = rowIndices;
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(this.rowIndices[rowIndex], columnIndex, value);
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(this.rowIndices[rowIndex], columnIndex);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/views/columnSelection.js


class columnSelection_MatrixColumnSelectionView extends base_BaseView {
  constructor(matrix, columnIndices) {
    columnIndices = checkColumnIndices(matrix, columnIndices);
    super(matrix, matrix.rows, columnIndices.length);
    this.columnIndices = columnIndices;
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(rowIndex, this.columnIndices[columnIndex], value);
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(rowIndex, this.columnIndices[columnIndex]);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/views/column.js

class column_MatrixColumnView extends base_BaseView {
  constructor(matrix, column) {
    super(matrix, matrix.rows, 1);
    this.column = column;
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(rowIndex, this.column, value);
    return this;
  }

  get(rowIndex) {
    return this.matrix.get(rowIndex, this.column);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/views/flipRow.js

class flipRow_MatrixFlipRowView extends base_BaseView {
  constructor(matrix) {
    super(matrix, matrix.rows, matrix.columns);
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(this.rows - rowIndex - 1, columnIndex, value);
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(this.rows - rowIndex - 1, columnIndex);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/views/flipColumn.js

class flipColumn_MatrixFlipColumnView extends base_BaseView {
  constructor(matrix) {
    super(matrix, matrix.rows, matrix.columns);
  }

  set(rowIndex, columnIndex, value) {
    this.matrix.set(rowIndex, this.columns - columnIndex - 1, value);
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.matrix.get(rowIndex, this.columns - columnIndex - 1);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/abstractMatrix.js













function AbstractMatrix(superCtor) {
  if (superCtor === undefined) superCtor = Object;
  /**
   * Real matrix
   * @class Matrix
   * @param {number|Array|Matrix} nRows - Number of rows of the new matrix,
   * 2D array containing the data or Matrix instance to clone
   * @param {number} [nColumns] - Number of columns of the new matrix
   */

  class Matrix extends superCtor {
    static get [Symbol.species]() {
      return this;
    }
    /**
     * Constructs a Matrix with the chosen dimensions from a 1D array
     * @param {number} newRows - Number of rows
     * @param {number} newColumns - Number of columns
     * @param {Array} newData - A 1D array containing data for the matrix
     * @return {Matrix} - The new matrix
     */


    static from1DArray(newRows, newColumns, newData) {
      var length = newRows * newColumns;

      if (length !== newData.length) {
        throw new RangeError('Data length does not match given dimensions');
      }

      var newMatrix = new this(newRows, newColumns);

      for (var row = 0; row < newRows; row++) {
        for (var column = 0; column < newColumns; column++) {
          newMatrix.set(row, column, newData[row * newColumns + column]);
        }
      }

      return newMatrix;
    }
    /**
         * Creates a row vector, a matrix with only one row.
         * @param {Array} newData - A 1D array containing data for the vector
         * @return {Matrix} - The new matrix
         */


    static rowVector(newData) {
      var vector = new this(1, newData.length);

      for (var i = 0; i < newData.length; i++) {
        vector.set(0, i, newData[i]);
      }

      return vector;
    }
    /**
         * Creates a column vector, a matrix with only one column.
         * @param {Array} newData - A 1D array containing data for the vector
         * @return {Matrix} - The new matrix
         */


    static columnVector(newData) {
      var vector = new this(newData.length, 1);

      for (var i = 0; i < newData.length; i++) {
        vector.set(i, 0, newData[i]);
      }

      return vector;
    }
    /**
         * Creates an empty matrix with the given dimensions. Values will be undefined. Same as using new Matrix(rows, columns).
         * @param {number} rows - Number of rows
         * @param {number} columns - Number of columns
         * @return {Matrix} - The new matrix
         */


    static empty(rows, columns) {
      return new this(rows, columns);
    }
    /**
         * Creates a matrix with the given dimensions. Values will be set to zero.
         * @param {number} rows - Number of rows
         * @param {number} columns - Number of columns
         * @return {Matrix} - The new matrix
         */


    static zeros(rows, columns) {
      return this.empty(rows, columns).fill(0);
    }
    /**
         * Creates a matrix with the given dimensions. Values will be set to one.
         * @param {number} rows - Number of rows
         * @param {number} columns - Number of columns
         * @return {Matrix} - The new matrix
         */


    static ones(rows, columns) {
      return this.empty(rows, columns).fill(1);
    }
    /**
         * Creates a matrix with the given dimensions. Values will be randomly set.
         * @param {number} rows - Number of rows
         * @param {number} columns - Number of columns
         * @param {function} [rng=Math.random] - Random number generator
         * @return {Matrix} The new matrix
         */


    static rand(rows, columns, rng) {
      if (rng === undefined) rng = Math.random;
      var matrix = this.empty(rows, columns);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          matrix.set(i, j, rng());
        }
      }

      return matrix;
    }
    /**
         * Creates a matrix with the given dimensions. Values will be random integers.
         * @param {number} rows - Number of rows
         * @param {number} columns - Number of columns
         * @param {number} [maxValue=1000] - Maximum value
         * @param {function} [rng=Math.random] - Random number generator
         * @return {Matrix} The new matrix
         */


    static randInt(rows, columns, maxValue, rng) {
      if (maxValue === undefined) maxValue = 1000;
      if (rng === undefined) rng = Math.random;
      var matrix = this.empty(rows, columns);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          var value = Math.floor(rng() * maxValue);
          matrix.set(i, j, value);
        }
      }

      return matrix;
    }
    /**
         * Creates an identity matrix with the given dimension. Values of the diagonal will be 1 and others will be 0.
         * @param {number} rows - Number of rows
         * @param {number} [columns=rows] - Number of columns
         * @param {number} [value=1] - Value to fill the diagonal with
         * @return {Matrix} - The new identity matrix
         */


    static eye(rows, columns, value) {
      if (columns === undefined) columns = rows;
      if (value === undefined) value = 1;
      var min = Math.min(rows, columns);
      var matrix = this.zeros(rows, columns);

      for (var i = 0; i < min; i++) {
        matrix.set(i, i, value);
      }

      return matrix;
    }
    /**
         * Creates a diagonal matrix based on the given array.
         * @param {Array} data - Array containing the data for the diagonal
         * @param {number} [rows] - Number of rows (Default: data.length)
         * @param {number} [columns] - Number of columns (Default: rows)
         * @return {Matrix} - The new diagonal matrix
         */


    static diag(data, rows, columns) {
      var l = data.length;
      if (rows === undefined) rows = l;
      if (columns === undefined) columns = rows;
      var min = Math.min(l, rows, columns);
      var matrix = this.zeros(rows, columns);

      for (var i = 0; i < min; i++) {
        matrix.set(i, i, data[i]);
      }

      return matrix;
    }
    /**
         * Returns a matrix whose elements are the minimum between matrix1 and matrix2
         * @param {Matrix} matrix1
         * @param {Matrix} matrix2
         * @return {Matrix}
         */


    static min(matrix1, matrix2) {
      matrix1 = this.checkMatrix(matrix1);
      matrix2 = this.checkMatrix(matrix2);
      var rows = matrix1.rows;
      var columns = matrix1.columns;
      var result = new this(rows, columns);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          result.set(i, j, Math.min(matrix1.get(i, j), matrix2.get(i, j)));
        }
      }

      return result;
    }
    /**
         * Returns a matrix whose elements are the maximum between matrix1 and matrix2
         * @param {Matrix} matrix1
         * @param {Matrix} matrix2
         * @return {Matrix}
         */


    static max(matrix1, matrix2) {
      matrix1 = this.checkMatrix(matrix1);
      matrix2 = this.checkMatrix(matrix2);
      var rows = matrix1.rows;
      var columns = matrix1.columns;
      var result = new this(rows, columns);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          result.set(i, j, Math.max(matrix1.get(i, j), matrix2.get(i, j)));
        }
      }

      return result;
    }
    /**
         * Check that the provided value is a Matrix and tries to instantiate one if not
         * @param {*} value - The value to check
         * @return {Matrix}
         */


    static checkMatrix(value) {
      return Matrix.isMatrix(value) ? value : new this(value);
    }
    /**
         * Returns true if the argument is a Matrix, false otherwise
         * @param {*} value - The value to check
         * @return {boolean}
         */


    static isMatrix(value) {
      return value != null && value.klass === 'Matrix';
    }
    /**
         * @prop {number} size - The number of elements in the matrix.
         */


    get size() {
      return this.rows * this.columns;
    }
    /**
         * Applies a callback for each element of the matrix. The function is called in the matrix (this) context.
         * @param {function} callback - Function that will be called with two parameters : i (row) and j (column)
         * @return {Matrix} this
         */


    apply(callback) {
      if (typeof callback !== 'function') {
        throw new TypeError('callback must be a function');
      }

      var ii = this.rows;
      var jj = this.columns;

      for (var i = 0; i < ii; i++) {
        for (var j = 0; j < jj; j++) {
          callback.call(this, i, j);
        }
      }

      return this;
    }
    /**
         * Returns a new 1D array filled row by row with the matrix values
         * @return {Array}
         */


    to1DArray() {
      var array = new Array(this.size);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          array[i * this.columns + j] = this.get(i, j);
        }
      }

      return array;
    }
    /**
         * Returns a 2D array containing a copy of the data
         * @return {Array}
         */


    to2DArray() {
      var copy = new Array(this.rows);

      for (var i = 0; i < this.rows; i++) {
        copy[i] = new Array(this.columns);

        for (var j = 0; j < this.columns; j++) {
          copy[i][j] = this.get(i, j);
        }
      }

      return copy;
    }
    /**
         * @return {boolean} true if the matrix has one row
         */


    isRowVector() {
      return this.rows === 1;
    }
    /**
         * @return {boolean} true if the matrix has one column
         */


    isColumnVector() {
      return this.columns === 1;
    }
    /**
         * @return {boolean} true if the matrix has one row or one column
         */


    isVector() {
      return this.rows === 1 || this.columns === 1;
    }
    /**
         * @return {boolean} true if the matrix has the same number of rows and columns
         */


    isSquare() {
      return this.rows === this.columns;
    }
    /**
         * @return {boolean} true if the matrix is square and has the same values on both sides of the diagonal
         */


    isSymmetric() {
      if (this.isSquare()) {
        for (var i = 0; i < this.rows; i++) {
          for (var j = 0; j <= i; j++) {
            if (this.get(i, j) !== this.get(j, i)) {
              return false;
            }
          }
        }

        return true;
      }

      return false;
    }
    /**
          * @return true if the matrix is in echelon form
          */


    isEchelonForm() {
      let i = 0;
      let j = 0;
      let previousColumn = -1;
      let isEchelonForm = true;
      let checked = false;

      while (i < this.rows && isEchelonForm) {
        j = 0;
        checked = false;

        while (j < this.columns && checked === false) {
          if (this.get(i, j) === 0) {
            j++;
          } else if (this.get(i, j) === 1 && j > previousColumn) {
            checked = true;
            previousColumn = j;
          } else {
            isEchelonForm = false;
            checked = true;
          }
        }

        i++;
      }

      return isEchelonForm;
    }
    /**
             * @return true if the matrix is in reduced echelon form
             */


    isReducedEchelonForm() {
      let i = 0;
      let j = 0;
      let previousColumn = -1;
      let isReducedEchelonForm = true;
      let checked = false;

      while (i < this.rows && isReducedEchelonForm) {
        j = 0;
        checked = false;

        while (j < this.columns && checked === false) {
          if (this.get(i, j) === 0) {
            j++;
          } else if (this.get(i, j) === 1 && j > previousColumn) {
            checked = true;
            previousColumn = j;
          } else {
            isReducedEchelonForm = false;
            checked = true;
          }
        }

        for (let k = j + 1; k < this.rows; k++) {
          if (this.get(i, k) !== 0) {
            isReducedEchelonForm = false;
          }
        }

        i++;
      }

      return isReducedEchelonForm;
    }
    /**
         * Sets a given element of the matrix. mat.set(3,4,1) is equivalent to mat[3][4]=1
         * @abstract
         * @param {number} rowIndex - Index of the row
         * @param {number} columnIndex - Index of the column
         * @param {number} value - The new value for the element
         * @return {Matrix} this
         */


    set(rowIndex, columnIndex, value) {
      // eslint-disable-line no-unused-vars
      throw new Error('set method is unimplemented');
    }
    /**
         * Returns the given element of the matrix. mat.get(3,4) is equivalent to matrix[3][4]
         * @abstract
         * @param {number} rowIndex - Index of the row
         * @param {number} columnIndex - Index of the column
         * @return {number}
         */


    get(rowIndex, columnIndex) {
      // eslint-disable-line no-unused-vars
      throw new Error('get method is unimplemented');
    }
    /**
         * Creates a new matrix that is a repetition of the current matrix. New matrix has rowRep times the number of
         * rows of the matrix, and colRep times the number of columns of the matrix
         * @param {number} rowRep - Number of times the rows should be repeated
         * @param {number} colRep - Number of times the columns should be re
         * @return {Matrix}
         * @example
         * var matrix = new Matrix([[1,2]]);
         * matrix.repeat(2); // [[1,2],[1,2]]
         */


    repeat(rowRep, colRep) {
      rowRep = rowRep || 1;
      colRep = colRep || 1;
      var matrix = new this.constructor[Symbol.species](this.rows * rowRep, this.columns * colRep);

      for (var i = 0; i < rowRep; i++) {
        for (var j = 0; j < colRep; j++) {
          matrix.setSubMatrix(this, this.rows * i, this.columns * j);
        }
      }

      return matrix;
    }
    /**
         * Fills the matrix with a given value. All elements will be set to this value.
         * @param {number} value - New value
         * @return {Matrix} this
         */


    fill(value) {
      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, value);
        }
      }

      return this;
    }
    /**
         * Negates the matrix. All elements will be multiplied by (-1)
         * @return {Matrix} this
         */


    neg() {
      return this.mulS(-1);
    }
    /**
         * Returns a new array from the given row index
         * @param {number} index - Row index
         * @return {Array}
         */


    getRow(index) {
      checkRowIndex(this, index);
      var row = new Array(this.columns);

      for (var i = 0; i < this.columns; i++) {
        row[i] = this.get(index, i);
      }

      return row;
    }
    /**
         * Returns a new row vector from the given row index
         * @param {number} index - Row index
         * @return {Matrix}
         */


    getRowVector(index) {
      return this.constructor.rowVector(this.getRow(index));
    }
    /**
         * Sets a row at the given index
         * @param {number} index - Row index
         * @param {Array|Matrix} array - Array or vector
         * @return {Matrix} this
         */


    setRow(index, array) {
      checkRowIndex(this, index);
      array = checkRowVector(this, array);

      for (var i = 0; i < this.columns; i++) {
        this.set(index, i, array[i]);
      }

      return this;
    }
    /**
         * Swaps two rows
         * @param {number} row1 - First row index
         * @param {number} row2 - Second row index
         * @return {Matrix} this
         */


    swapRows(row1, row2) {
      checkRowIndex(this, row1);
      checkRowIndex(this, row2);

      for (var i = 0; i < this.columns; i++) {
        var temp = this.get(row1, i);
        this.set(row1, i, this.get(row2, i));
        this.set(row2, i, temp);
      }

      return this;
    }
    /**
         * Returns a new array from the given column index
         * @param {number} index - Column index
         * @return {Array}
         */


    getColumn(index) {
      checkColumnIndex(this, index);
      var column = new Array(this.rows);

      for (var i = 0; i < this.rows; i++) {
        column[i] = this.get(i, index);
      }

      return column;
    }
    /**
         * Returns a new column vector from the given column index
         * @param {number} index - Column index
         * @return {Matrix}
         */


    getColumnVector(index) {
      return this.constructor.columnVector(this.getColumn(index));
    }
    /**
         * Sets a column at the given index
         * @param {number} index - Column index
         * @param {Array|Matrix} array - Array or vector
         * @return {Matrix} this
         */


    setColumn(index, array) {
      checkColumnIndex(this, index);
      array = checkColumnVector(this, array);

      for (var i = 0; i < this.rows; i++) {
        this.set(i, index, array[i]);
      }

      return this;
    }
    /**
         * Swaps two columns
         * @param {number} column1 - First column index
         * @param {number} column2 - Second column index
         * @return {Matrix} this
         */


    swapColumns(column1, column2) {
      checkColumnIndex(this, column1);
      checkColumnIndex(this, column2);

      for (var i = 0; i < this.rows; i++) {
        var temp = this.get(i, column1);
        this.set(i, column1, this.get(i, column2));
        this.set(i, column2, temp);
      }

      return this;
    }
    /**
         * Adds the values of a vector to each row
         * @param {Array|Matrix} vector - Array or vector
         * @return {Matrix} this
         */


    addRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + vector[j]);
        }
      }

      return this;
    }
    /**
         * Subtracts the values of a vector from each row
         * @param {Array|Matrix} vector - Array or vector
         * @return {Matrix} this
         */


    subRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - vector[j]);
        }
      }

      return this;
    }
    /**
         * Multiplies the values of a vector with each row
         * @param {Array|Matrix} vector - Array or vector
         * @return {Matrix} this
         */


    mulRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * vector[j]);
        }
      }

      return this;
    }
    /**
         * Divides the values of each row by those of a vector
         * @param {Array|Matrix} vector - Array or vector
         * @return {Matrix} this
         */


    divRowVector(vector) {
      vector = checkRowVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / vector[j]);
        }
      }

      return this;
    }
    /**
         * Adds the values of a vector to each column
         * @param {Array|Matrix} vector - Array or vector
         * @return {Matrix} this
         */


    addColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) + vector[i]);
        }
      }

      return this;
    }
    /**
         * Subtracts the values of a vector from each column
         * @param {Array|Matrix} vector - Array or vector
         * @return {Matrix} this
         */


    subColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) - vector[i]);
        }
      }

      return this;
    }
    /**
         * Multiplies the values of a vector with each column
         * @param {Array|Matrix} vector - Array or vector
         * @return {Matrix} this
         */


    mulColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) * vector[i]);
        }
      }

      return this;
    }
    /**
         * Divides the values of each column by those of a vector
         * @param {Array|Matrix} vector - Array or vector
         * @return {Matrix} this
         */


    divColumnVector(vector) {
      vector = checkColumnVector(this, vector);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          this.set(i, j, this.get(i, j) / vector[i]);
        }
      }

      return this;
    }
    /**
         * Multiplies the values of a row with a scalar
         * @param {number} index - Row index
         * @param {number} value
         * @return {Matrix} this
         */


    mulRow(index, value) {
      checkRowIndex(this, index);

      for (var i = 0; i < this.columns; i++) {
        this.set(index, i, this.get(index, i) * value);
      }

      return this;
    }
    /**
         * Multiplies the values of a column with a scalar
         * @param {number} index - Column index
         * @param {number} value
         * @return {Matrix} this
         */


    mulColumn(index, value) {
      checkColumnIndex(this, index);

      for (var i = 0; i < this.rows; i++) {
        this.set(i, index, this.get(i, index) * value);
      }

      return this;
    }
    /**
         * Returns the maximum value of the matrix
         * @return {number}
         */


    max() {
      var v = this.get(0, 0);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          if (this.get(i, j) > v) {
            v = this.get(i, j);
          }
        }
      }

      return v;
    }
    /**
         * Returns the index of the maximum value
         * @return {Array}
         */


    maxIndex() {
      var v = this.get(0, 0);
      var idx = [0, 0];

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          if (this.get(i, j) > v) {
            v = this.get(i, j);
            idx[0] = i;
            idx[1] = j;
          }
        }
      }

      return idx;
    }
    /**
         * Returns the minimum value of the matrix
         * @return {number}
         */


    min() {
      var v = this.get(0, 0);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          if (this.get(i, j) < v) {
            v = this.get(i, j);
          }
        }
      }

      return v;
    }
    /**
         * Returns the index of the minimum value
         * @return {Array}
         */


    minIndex() {
      var v = this.get(0, 0);
      var idx = [0, 0];

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          if (this.get(i, j) < v) {
            v = this.get(i, j);
            idx[0] = i;
            idx[1] = j;
          }
        }
      }

      return idx;
    }
    /**
         * Returns the maximum value of one row
         * @param {number} row - Row index
         * @return {number}
         */


    maxRow(row) {
      checkRowIndex(this, row);
      var v = this.get(row, 0);

      for (var i = 1; i < this.columns; i++) {
        if (this.get(row, i) > v) {
          v = this.get(row, i);
        }
      }

      return v;
    }
    /**
         * Returns the index of the maximum value of one row
         * @param {number} row - Row index
         * @return {Array}
         */


    maxRowIndex(row) {
      checkRowIndex(this, row);
      var v = this.get(row, 0);
      var idx = [row, 0];

      for (var i = 1; i < this.columns; i++) {
        if (this.get(row, i) > v) {
          v = this.get(row, i);
          idx[1] = i;
        }
      }

      return idx;
    }
    /**
         * Returns the minimum value of one row
         * @param {number} row - Row index
         * @return {number}
         */


    minRow(row) {
      checkRowIndex(this, row);
      var v = this.get(row, 0);

      for (var i = 1; i < this.columns; i++) {
        if (this.get(row, i) < v) {
          v = this.get(row, i);
        }
      }

      return v;
    }
    /**
         * Returns the index of the maximum value of one row
         * @param {number} row - Row index
         * @return {Array}
         */


    minRowIndex(row) {
      checkRowIndex(this, row);
      var v = this.get(row, 0);
      var idx = [row, 0];

      for (var i = 1; i < this.columns; i++) {
        if (this.get(row, i) < v) {
          v = this.get(row, i);
          idx[1] = i;
        }
      }

      return idx;
    }
    /**
         * Returns the maximum value of one column
         * @param {number} column - Column index
         * @return {number}
         */


    maxColumn(column) {
      checkColumnIndex(this, column);
      var v = this.get(0, column);

      for (var i = 1; i < this.rows; i++) {
        if (this.get(i, column) > v) {
          v = this.get(i, column);
        }
      }

      return v;
    }
    /**
         * Returns the index of the maximum value of one column
         * @param {number} column - Column index
         * @return {Array}
         */


    maxColumnIndex(column) {
      checkColumnIndex(this, column);
      var v = this.get(0, column);
      var idx = [0, column];

      for (var i = 1; i < this.rows; i++) {
        if (this.get(i, column) > v) {
          v = this.get(i, column);
          idx[0] = i;
        }
      }

      return idx;
    }
    /**
         * Returns the minimum value of one column
         * @param {number} column - Column index
         * @return {number}
         */


    minColumn(column) {
      checkColumnIndex(this, column);
      var v = this.get(0, column);

      for (var i = 1; i < this.rows; i++) {
        if (this.get(i, column) < v) {
          v = this.get(i, column);
        }
      }

      return v;
    }
    /**
         * Returns the index of the minimum value of one column
         * @param {number} column - Column index
         * @return {Array}
         */


    minColumnIndex(column) {
      checkColumnIndex(this, column);
      var v = this.get(0, column);
      var idx = [0, column];

      for (var i = 1; i < this.rows; i++) {
        if (this.get(i, column) < v) {
          v = this.get(i, column);
          idx[0] = i;
        }
      }

      return idx;
    }
    /**
         * Returns an array containing the diagonal values of the matrix
         * @return {Array}
         */


    diag() {
      var min = Math.min(this.rows, this.columns);
      var diag = new Array(min);

      for (var i = 0; i < min; i++) {
        diag[i] = this.get(i, i);
      }

      return diag;
    }
    /**
         * Returns the sum by the argument given, if no argument given,
         * it returns the sum of all elements of the matrix.
         * @param {string} by - sum by 'row' or 'column'.
         * @return {Matrix|number}
         */


    sum(by) {
      switch (by) {
        case 'row':
          return sumByRow(this);

        case 'column':
          return sumByColumn(this);

        default:
          return sumAll(this);
      }
    }
    /**
         * Returns the mean of all elements of the matrix
         * @return {number}
         */


    mean() {
      return this.sum() / this.size;
    }
    /**
         * Returns the product of all elements of the matrix
         * @return {number}
         */


    prod() {
      var prod = 1;

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          prod *= this.get(i, j);
        }
      }

      return prod;
    }
    /**
         * Returns the norm of a matrix.
         * @param {string} type - "frobenius" (default) or "max" return resp. the Frobenius norm and the max norm.
         * @return {number}
         */


    norm() {
      let type = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'frobenius';
      var result = 0;

      if (type === 'max') {
        return this.max();
      } else if (type === 'frobenius') {
        for (var i = 0; i < this.rows; i++) {
          for (var j = 0; j < this.columns; j++) {
            result = result + this.get(i, j) * this.get(i, j);
          }
        }

        return Math.sqrt(result);
      } else {
        throw new RangeError("unknown norm type: ".concat(type));
      }
    }
    /**
         * Computes the cumulative sum of the matrix elements (in place, row by row)
         * @return {Matrix} this
         */


    cumulativeSum() {
      var sum = 0;

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          sum += this.get(i, j);
          this.set(i, j, sum);
        }
      }

      return this;
    }
    /**
         * Computes the dot (scalar) product between the matrix and another
         * @param {Matrix} vector2 vector
         * @return {number}
         */


    dot(vector2) {
      if (Matrix.isMatrix(vector2)) vector2 = vector2.to1DArray();
      var vector1 = this.to1DArray();

      if (vector1.length !== vector2.length) {
        throw new RangeError('vectors do not have the same size');
      }

      var dot = 0;

      for (var i = 0; i < vector1.length; i++) {
        dot += vector1[i] * vector2[i];
      }

      return dot;
    }
    /**
         * Returns the matrix product between this and other
         * @param {Matrix} other
         * @return {Matrix}
         */


    mmul(other) {
      other = this.constructor.checkMatrix(other);

      if (this.columns !== other.rows) {
        // eslint-disable-next-line no-console
        console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');
      }

      var m = this.rows;
      var n = this.columns;
      var p = other.columns;
      var result = new this.constructor[Symbol.species](m, p);
      var Bcolj = new Array(n);

      for (var j = 0; j < p; j++) {
        for (var k = 0; k < n; k++) {
          Bcolj[k] = other.get(k, j);
        }

        for (var i = 0; i < m; i++) {
          var s = 0;

          for (k = 0; k < n; k++) {
            s += this.get(i, k) * Bcolj[k];
          }

          result.set(i, j, s);
        }
      }

      return result;
    }

    strassen2x2(other) {
      var result = new this.constructor[Symbol.species](2, 2);
      const a11 = this.get(0, 0);
      const b11 = other.get(0, 0);
      const a12 = this.get(0, 1);
      const b12 = other.get(0, 1);
      const a21 = this.get(1, 0);
      const b21 = other.get(1, 0);
      const a22 = this.get(1, 1);
      const b22 = other.get(1, 1); // Compute intermediate values.

      const m1 = (a11 + a22) * (b11 + b22);
      const m2 = (a21 + a22) * b11;
      const m3 = a11 * (b12 - b22);
      const m4 = a22 * (b21 - b11);
      const m5 = (a11 + a12) * b22;
      const m6 = (a21 - a11) * (b11 + b12);
      const m7 = (a12 - a22) * (b21 + b22); // Combine intermediate values into the output.

      const c00 = m1 + m4 - m5 + m7;
      const c01 = m3 + m5;
      const c10 = m2 + m4;
      const c11 = m1 - m2 + m3 + m6;
      result.set(0, 0, c00);
      result.set(0, 1, c01);
      result.set(1, 0, c10);
      result.set(1, 1, c11);
      return result;
    }

    strassen3x3(other) {
      var result = new this.constructor[Symbol.species](3, 3);
      const a00 = this.get(0, 0);
      const a01 = this.get(0, 1);
      const a02 = this.get(0, 2);
      const a10 = this.get(1, 0);
      const a11 = this.get(1, 1);
      const a12 = this.get(1, 2);
      const a20 = this.get(2, 0);
      const a21 = this.get(2, 1);
      const a22 = this.get(2, 2);
      const b00 = other.get(0, 0);
      const b01 = other.get(0, 1);
      const b02 = other.get(0, 2);
      const b10 = other.get(1, 0);
      const b11 = other.get(1, 1);
      const b12 = other.get(1, 2);
      const b20 = other.get(2, 0);
      const b21 = other.get(2, 1);
      const b22 = other.get(2, 2);
      const m1 = (a00 + a01 + a02 - a10 - a11 - a21 - a22) * b11;
      const m2 = (a00 - a10) * (-b01 + b11);
      const m3 = a11 * (-b00 + b01 + b10 - b11 - b12 - b20 + b22);
      const m4 = (-a00 + a10 + a11) * (b00 - b01 + b11);
      const m5 = (a10 + a11) * (-b00 + b01);
      const m6 = a00 * b00;
      const m7 = (-a00 + a20 + a21) * (b00 - b02 + b12);
      const m8 = (-a00 + a20) * (b02 - b12);
      const m9 = (a20 + a21) * (-b00 + b02);
      const m10 = (a00 + a01 + a02 - a11 - a12 - a20 - a21) * b12;
      const m11 = a21 * (-b00 + b02 + b10 - b11 - b12 - b20 + b21);
      const m12 = (-a02 + a21 + a22) * (b11 + b20 - b21);
      const m13 = (a02 - a22) * (b11 - b21);
      const m14 = a02 * b20;
      const m15 = (a21 + a22) * (-b20 + b21);
      const m16 = (-a02 + a11 + a12) * (b12 + b20 - b22);
      const m17 = (a02 - a12) * (b12 - b22);
      const m18 = (a11 + a12) * (-b20 + b22);
      const m19 = a01 * b10;
      const m20 = a12 * b21;
      const m21 = a10 * b02;
      const m22 = a20 * b01;
      const m23 = a22 * b22;
      const c00 = m6 + m14 + m19;
      const c01 = m1 + m4 + m5 + m6 + m12 + m14 + m15;
      const c02 = m6 + m7 + m9 + m10 + m14 + m16 + m18;
      const c10 = m2 + m3 + m4 + m6 + m14 + m16 + m17;
      const c11 = m2 + m4 + m5 + m6 + m20;
      const c12 = m14 + m16 + m17 + m18 + m21;
      const c20 = m6 + m7 + m8 + m11 + m12 + m13 + m14;
      const c21 = m12 + m13 + m14 + m15 + m22;
      const c22 = m6 + m7 + m8 + m9 + m23;
      result.set(0, 0, c00);
      result.set(0, 1, c01);
      result.set(0, 2, c02);
      result.set(1, 0, c10);
      result.set(1, 1, c11);
      result.set(1, 2, c12);
      result.set(2, 0, c20);
      result.set(2, 1, c21);
      result.set(2, 2, c22);
      return result;
    }
    /**
         * Returns the matrix product between x and y. More efficient than mmul(other) only when we multiply squared matrix and when the size of the matrix is > 1000.
         * @param {Matrix} y
         * @return {Matrix}
         */


    mmulStrassen(y) {
      var x = this.clone();
      var r1 = x.rows;
      var c1 = x.columns;
      var r2 = y.rows;
      var c2 = y.columns;

      if (c1 !== r2) {
        // eslint-disable-next-line no-console
        console.warn("Multiplying ".concat(r1, " x ").concat(c1, " and ").concat(r2, " x ").concat(c2, " matrix: dimensions do not match."));
      } // Put a matrix into the top left of a matrix of zeros.
      // `rows` and `cols` are the dimensions of the output matrix.


      function embed(mat, rows, cols) {
        var r = mat.rows;
        var c = mat.columns;

        if (r === rows && c === cols) {
          return mat;
        } else {
          var resultat = Matrix.zeros(rows, cols);
          resultat = resultat.setSubMatrix(mat, 0, 0);
          return resultat;
        }
      } // Make sure both matrices are the same size.
      // This is exclusively for simplicity:
      // this algorithm can be implemented with matrices of different sizes.


      var r = Math.max(r1, r2);
      var c = Math.max(c1, c2);
      x = embed(x, r, c);
      y = embed(y, r, c); // Our recursive multiplication function.

      function blockMult(a, b, rows, cols) {
        // For small matrices, resort to naive multiplication.
        if (rows <= 512 || cols <= 512) {
          return a.mmul(b); // a is equivalent to this
        } // Apply dynamic padding.


        if (rows % 2 === 1 && cols % 2 === 1) {
          a = embed(a, rows + 1, cols + 1);
          b = embed(b, rows + 1, cols + 1);
        } else if (rows % 2 === 1) {
          a = embed(a, rows + 1, cols);
          b = embed(b, rows + 1, cols);
        } else if (cols % 2 === 1) {
          a = embed(a, rows, cols + 1);
          b = embed(b, rows, cols + 1);
        }

        var halfRows = parseInt(a.rows / 2, 10);
        var halfCols = parseInt(a.columns / 2, 10); // Subdivide input matrices.

        var a11 = a.subMatrix(0, halfRows - 1, 0, halfCols - 1);
        var b11 = b.subMatrix(0, halfRows - 1, 0, halfCols - 1);
        var a12 = a.subMatrix(0, halfRows - 1, halfCols, a.columns - 1);
        var b12 = b.subMatrix(0, halfRows - 1, halfCols, b.columns - 1);
        var a21 = a.subMatrix(halfRows, a.rows - 1, 0, halfCols - 1);
        var b21 = b.subMatrix(halfRows, b.rows - 1, 0, halfCols - 1);
        var a22 = a.subMatrix(halfRows, a.rows - 1, halfCols, a.columns - 1);
        var b22 = b.subMatrix(halfRows, b.rows - 1, halfCols, b.columns - 1); // Compute intermediate values.

        var m1 = blockMult(Matrix.add(a11, a22), Matrix.add(b11, b22), halfRows, halfCols);
        var m2 = blockMult(Matrix.add(a21, a22), b11, halfRows, halfCols);
        var m3 = blockMult(a11, Matrix.sub(b12, b22), halfRows, halfCols);
        var m4 = blockMult(a22, Matrix.sub(b21, b11), halfRows, halfCols);
        var m5 = blockMult(Matrix.add(a11, a12), b22, halfRows, halfCols);
        var m6 = blockMult(Matrix.sub(a21, a11), Matrix.add(b11, b12), halfRows, halfCols);
        var m7 = blockMult(Matrix.sub(a12, a22), Matrix.add(b21, b22), halfRows, halfCols); // Combine intermediate values into the output.

        var c11 = Matrix.add(m1, m4);
        c11.sub(m5);
        c11.add(m7);
        var c12 = Matrix.add(m3, m5);
        var c21 = Matrix.add(m2, m4);
        var c22 = Matrix.sub(m1, m2);
        c22.add(m3);
        c22.add(m6); // Crop output to the desired size (undo dynamic padding).

        var resultat = Matrix.zeros(2 * c11.rows, 2 * c11.columns);
        resultat = resultat.setSubMatrix(c11, 0, 0);
        resultat = resultat.setSubMatrix(c12, c11.rows, 0);
        resultat = resultat.setSubMatrix(c21, 0, c11.columns);
        resultat = resultat.setSubMatrix(c22, c11.rows, c11.columns);
        return resultat.subMatrix(0, rows - 1, 0, cols - 1);
      }

      return blockMult(x, y, r, c);
    }
    /**
         * Returns a row-by-row scaled matrix
         * @param {number} [min=0] - Minimum scaled value
         * @param {number} [max=1] - Maximum scaled value
         * @return {Matrix} - The scaled matrix
         */


    scaleRows(min, max) {
      min = min === undefined ? 0 : min;
      max = max === undefined ? 1 : max;

      if (min >= max) {
        throw new RangeError('min should be strictly smaller than max');
      }

      var newMatrix = this.constructor.empty(this.rows, this.columns);

      for (var i = 0; i < this.rows; i++) {
        var scaled = Object(lib_es6["default"])(this.getRow(i), {
          min,
          max
        });
        newMatrix.setRow(i, scaled);
      }

      return newMatrix;
    }
    /**
         * Returns a new column-by-column scaled matrix
         * @param {number} [min=0] - Minimum scaled value
         * @param {number} [max=1] - Maximum scaled value
         * @return {Matrix} - The new scaled matrix
         * @example
         * var matrix = new Matrix([[1,2],[-1,0]]);
         * var scaledMatrix = matrix.scaleColumns(); // [[1,1],[0,0]]
         */


    scaleColumns(min, max) {
      min = min === undefined ? 0 : min;
      max = max === undefined ? 1 : max;

      if (min >= max) {
        throw new RangeError('min should be strictly smaller than max');
      }

      var newMatrix = this.constructor.empty(this.rows, this.columns);

      for (var i = 0; i < this.columns; i++) {
        var scaled = Object(lib_es6["default"])(this.getColumn(i), {
          min: min,
          max: max
        });
        newMatrix.setColumn(i, scaled);
      }

      return newMatrix;
    }
    /**
         * Returns the Kronecker product (also known as tensor product) between this and other
         * See https://en.wikipedia.org/wiki/Kronecker_product
         * @param {Matrix} other
         * @return {Matrix}
         */


    kroneckerProduct(other) {
      other = this.constructor.checkMatrix(other);
      var m = this.rows;
      var n = this.columns;
      var p = other.rows;
      var q = other.columns;
      var result = new this.constructor[Symbol.species](m * p, n * q);

      for (var i = 0; i < m; i++) {
        for (var j = 0; j < n; j++) {
          for (var k = 0; k < p; k++) {
            for (var l = 0; l < q; l++) {
              result[p * i + k][q * j + l] = this.get(i, j) * other.get(k, l);
            }
          }
        }
      }

      return result;
    }
    /**
         * Transposes the matrix and returns a new one containing the result
         * @return {Matrix}
         */


    transpose() {
      var result = new this.constructor[Symbol.species](this.columns, this.rows);

      for (var i = 0; i < this.rows; i++) {
        for (var j = 0; j < this.columns; j++) {
          result.set(j, i, this.get(i, j));
        }
      }

      return result;
    }
    /**
         * Sorts the rows (in place)
         * @param {function} compareFunction - usual Array.prototype.sort comparison function
         * @return {Matrix} this
         */


    sortRows(compareFunction) {
      if (compareFunction === undefined) compareFunction = compareNumbers;

      for (var i = 0; i < this.rows; i++) {
        this.setRow(i, this.getRow(i).sort(compareFunction));
      }

      return this;
    }
    /**
         * Sorts the columns (in place)
         * @param {function} compareFunction - usual Array.prototype.sort comparison function
         * @return {Matrix} this
         */


    sortColumns(compareFunction) {
      if (compareFunction === undefined) compareFunction = compareNumbers;

      for (var i = 0; i < this.columns; i++) {
        this.setColumn(i, this.getColumn(i).sort(compareFunction));
      }

      return this;
    }
    /**
         * Returns a subset of the matrix
         * @param {number} startRow - First row index
         * @param {number} endRow - Last row index
         * @param {number} startColumn - First column index
         * @param {number} endColumn - Last column index
         * @return {Matrix}
         */


    subMatrix(startRow, endRow, startColumn, endColumn) {
      checkRange(this, startRow, endRow, startColumn, endColumn);
      var newMatrix = new this.constructor[Symbol.species](endRow - startRow + 1, endColumn - startColumn + 1);

      for (var i = startRow; i <= endRow; i++) {
        for (var j = startColumn; j <= endColumn; j++) {
          newMatrix[i - startRow][j - startColumn] = this.get(i, j);
        }
      }

      return newMatrix;
    }
    /**
         * Returns a subset of the matrix based on an array of row indices
         * @param {Array} indices - Array containing the row indices
         * @param {number} [startColumn = 0] - First column index
         * @param {number} [endColumn = this.columns-1] - Last column index
         * @return {Matrix}
         */


    subMatrixRow(indices, startColumn, endColumn) {
      if (startColumn === undefined) startColumn = 0;
      if (endColumn === undefined) endColumn = this.columns - 1;

      if (startColumn > endColumn || startColumn < 0 || startColumn >= this.columns || endColumn < 0 || endColumn >= this.columns) {
        throw new RangeError('Argument out of range');
      }

      var newMatrix = new this.constructor[Symbol.species](indices.length, endColumn - startColumn + 1);

      for (var i = 0; i < indices.length; i++) {
        for (var j = startColumn; j <= endColumn; j++) {
          if (indices[i] < 0 || indices[i] >= this.rows) {
            throw new RangeError("Row index out of range: ".concat(indices[i]));
          }

          newMatrix.set(i, j - startColumn, this.get(indices[i], j));
        }
      }

      return newMatrix;
    }
    /**
         * Returns a subset of the matrix based on an array of column indices
         * @param {Array} indices - Array containing the column indices
         * @param {number} [startRow = 0] - First row index
         * @param {number} [endRow = this.rows-1] - Last row index
         * @return {Matrix}
         */


    subMatrixColumn(indices, startRow, endRow) {
      if (startRow === undefined) startRow = 0;
      if (endRow === undefined) endRow = this.rows - 1;

      if (startRow > endRow || startRow < 0 || startRow >= this.rows || endRow < 0 || endRow >= this.rows) {
        throw new RangeError('Argument out of range');
      }

      var newMatrix = new this.constructor[Symbol.species](endRow - startRow + 1, indices.length);

      for (var i = 0; i < indices.length; i++) {
        for (var j = startRow; j <= endRow; j++) {
          if (indices[i] < 0 || indices[i] >= this.columns) {
            throw new RangeError("Column index out of range: ".concat(indices[i]));
          }

          newMatrix.set(j - startRow, i, this.get(j, indices[i]));
        }
      }

      return newMatrix;
    }
    /**
         * Set a part of the matrix to the given sub-matrix
         * @param {Matrix|Array< Array >} matrix - The source matrix from which to extract values.
         * @param {number} startRow - The index of the first row to set
         * @param {number} startColumn - The index of the first column to set
         * @return {Matrix}
         */


    setSubMatrix(matrix, startRow, startColumn) {
      matrix = this.constructor.checkMatrix(matrix);
      var endRow = startRow + matrix.rows - 1;
      var endColumn = startColumn + matrix.columns - 1;
      checkRange(this, startRow, endRow, startColumn, endColumn);

      for (var i = 0; i < matrix.rows; i++) {
        for (var j = 0; j < matrix.columns; j++) {
          this[startRow + i][startColumn + j] = matrix.get(i, j);
        }
      }

      return this;
    }
    /**
         * Return a new matrix based on a selection of rows and columns
         * @param {Array<number>} rowIndices - The row indices to select. Order matters and an index can be more than once.
         * @param {Array<number>} columnIndices - The column indices to select. Order matters and an index can be use more than once.
         * @return {Matrix} The new matrix
         */


    selection(rowIndices, columnIndices) {
      var indices = checkIndices(this, rowIndices, columnIndices);
      var newMatrix = new this.constructor[Symbol.species](rowIndices.length, columnIndices.length);

      for (var i = 0; i < indices.row.length; i++) {
        var rowIndex = indices.row[i];

        for (var j = 0; j < indices.column.length; j++) {
          var columnIndex = indices.column[j];
          newMatrix[i][j] = this.get(rowIndex, columnIndex);
        }
      }

      return newMatrix;
    }
    /**
         * Returns the trace of the matrix (sum of the diagonal elements)
         * @return {number}
         */


    trace() {
      var min = Math.min(this.rows, this.columns);
      var trace = 0;

      for (var i = 0; i < min; i++) {
        trace += this.get(i, i);
      }

      return trace;
    }
    /*
         Matrix views
         */

    /**
         * Returns a view of the transposition of the matrix
         * @return {MatrixTransposeView}
         */


    transposeView() {
      return new transpose_MatrixTransposeView(this);
    }
    /**
         * Returns a view of the row vector with the given index
         * @param {number} row - row index of the vector
         * @return {MatrixRowView}
         */


    rowView(row) {
      checkRowIndex(this, row);
      return new row_MatrixRowView(this, row);
    }
    /**
         * Returns a view of the column vector with the given index
         * @param {number} column - column index of the vector
         * @return {MatrixColumnView}
         */


    columnView(column) {
      checkColumnIndex(this, column);
      return new column_MatrixColumnView(this, column);
    }
    /**
         * Returns a view of the matrix flipped in the row axis
         * @return {MatrixFlipRowView}
         */


    flipRowView() {
      return new flipRow_MatrixFlipRowView(this);
    }
    /**
         * Returns a view of the matrix flipped in the column axis
         * @return {MatrixFlipColumnView}
         */


    flipColumnView() {
      return new flipColumn_MatrixFlipColumnView(this);
    }
    /**
         * Returns a view of a submatrix giving the index boundaries
         * @param {number} startRow - first row index of the submatrix
         * @param {number} endRow - last row index of the submatrix
         * @param {number} startColumn - first column index of the submatrix
         * @param {number} endColumn - last column index of the submatrix
         * @return {MatrixSubView}
         */


    subMatrixView(startRow, endRow, startColumn, endColumn) {
      return new sub_MatrixSubView(this, startRow, endRow, startColumn, endColumn);
    }
    /**
         * Returns a view of the cross of the row indices and the column indices
         * @example
         * // resulting vector is [[2], [2]]
         * var matrix = new Matrix([[1,2,3], [4,5,6]]).selectionView([0, 0], [1])
         * @param {Array<number>} rowIndices
         * @param {Array<number>} columnIndices
         * @return {MatrixSelectionView}
         */


    selectionView(rowIndices, columnIndices) {
      return new selection_MatrixSelectionView(this, rowIndices, columnIndices);
    }
    /**
         * Returns a view of the row indices
         * @example
         * // resulting vector is [[1,2,3], [1,2,3]]
         * var matrix = new Matrix([[1,2,3], [4,5,6]]).rowSelectionView([0, 0])
         * @param {Array<number>} rowIndices
         * @return {MatrixRowSelectionView}
         */


    rowSelectionView(rowIndices) {
      return new rowSelection_MatrixRowSelectionView(this, rowIndices);
    }
    /**
         * Returns a view of the column indices
         * @example
         * // resulting vector is [[2, 2], [5, 5]]
         * var matrix = new Matrix([[1,2,3], [4,5,6]]).columnSelectionView([1, 1])
         * @param {Array<number>} columnIndices
         * @return {MatrixColumnSelectionView}
         */


    columnSelectionView(columnIndices) {
      return new columnSelection_MatrixColumnSelectionView(this, columnIndices);
    }
    /**
        * Calculates and returns the determinant of a matrix as a Number
        * @example
        *   new Matrix([[1,2,3], [4,5,6]]).det()
        * @return {number}
        */


    det() {
      if (this.isSquare()) {
        var a, b, c, d;

        if (this.columns === 2) {
          // 2 x 2 matrix
          a = this.get(0, 0);
          b = this.get(0, 1);
          c = this.get(1, 0);
          d = this.get(1, 1);
          return a * d - b * c;
        } else if (this.columns === 3) {
          // 3 x 3 matrix
          var subMatrix0, subMatrix1, subMatrix2;
          subMatrix0 = this.selectionView([1, 2], [1, 2]);
          subMatrix1 = this.selectionView([1, 2], [0, 2]);
          subMatrix2 = this.selectionView([1, 2], [0, 1]);
          a = this.get(0, 0);
          b = this.get(0, 1);
          c = this.get(0, 2);
          return a * subMatrix0.det() - b * subMatrix1.det() + c * subMatrix2.det();
        } else {
          // general purpose determinant using the LU decomposition
          return new lu_LuDecomposition(this).determinant;
        }
      } else {
        throw Error('Determinant can only be calculated for a square matrix.');
      }
    }
    /**
         * Returns inverse of a matrix if it exists or the pseudoinverse
         * @param {number} threshold - threshold for taking inverse of singular values (default = 1e-15)
         * @return {Matrix} the (pseudo)inverted matrix.
         */


    pseudoInverse(threshold) {
      if (threshold === undefined) threshold = Number.EPSILON;
      var svdSolution = new svd_SingularValueDecomposition(this, {
        autoTranspose: true
      });
      var U = svdSolution.leftSingularVectors;
      var V = svdSolution.rightSingularVectors;
      var s = svdSolution.diagonal;

      for (var i = 0; i < s.length; i++) {
        if (Math.abs(s[i]) > threshold) {
          s[i] = 1.0 / s[i];
        } else {
          s[i] = 0.0;
        }
      } // convert list to diagonal


      s = this.constructor[Symbol.species].diag(s);
      return V.mmul(s.mmul(U.transposeView()));
    }
    /**
         * Creates an exact and independent copy of the matrix
         * @return {Matrix}
         */


    clone() {
      var newMatrix = new this.constructor[Symbol.species](this.rows, this.columns);

      for (var row = 0; row < this.rows; row++) {
        for (var column = 0; column < this.columns; column++) {
          newMatrix.set(row, column, this.get(row, column));
        }
      }

      return newMatrix;
    }

  }

  Matrix.prototype.klass = 'Matrix';

  function compareNumbers(a, b) {
    return a - b;
  }
  /*
     Synonyms
     */


  Matrix.random = Matrix.rand;
  Matrix.diagonal = Matrix.diag;
  Matrix.prototype.diagonal = Matrix.prototype.diag;
  Matrix.identity = Matrix.eye;
  Matrix.prototype.negate = Matrix.prototype.neg;
  Matrix.prototype.tensorProduct = Matrix.prototype.kroneckerProduct;
  Matrix.prototype.determinant = Matrix.prototype.det;
  /*
     Add dynamically instance and static methods for mathematical operations
     */

  var inplaceOperator = "\n(function %name%(value) {\n    if (typeof value === 'number') return this.%name%S(value);\n    return this.%name%M(value);\n})\n";
  var inplaceOperatorScalar = "\n(function %name%S(value) {\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, this.get(i, j) %op% value);\n        }\n    }\n    return this;\n})\n";
  var inplaceOperatorMatrix = "\n(function %name%M(matrix) {\n    matrix = this.constructor.checkMatrix(matrix);\n    if (this.rows !== matrix.rows ||\n        this.columns !== matrix.columns) {\n        throw new RangeError('Matrices dimensions must be equal');\n    }\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, this.get(i, j) %op% matrix.get(i, j));\n        }\n    }\n    return this;\n})\n";
  var staticOperator = "\n(function %name%(matrix, value) {\n    var newMatrix = new this[Symbol.species](matrix);\n    return newMatrix.%name%(value);\n})\n";
  var inplaceMethod = "\n(function %name%() {\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, %method%(this.get(i, j)));\n        }\n    }\n    return this;\n})\n";
  var staticMethod = "\n(function %name%(matrix) {\n    var newMatrix = new this[Symbol.species](matrix);\n    return newMatrix.%name%();\n})\n";
  var inplaceMethodWithArgs = "\n(function %name%(%args%) {\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, %method%(this.get(i, j), %args%));\n        }\n    }\n    return this;\n})\n";
  var staticMethodWithArgs = "\n(function %name%(matrix, %args%) {\n    var newMatrix = new this[Symbol.species](matrix);\n    return newMatrix.%name%(%args%);\n})\n";
  var inplaceMethodWithOneArgScalar = "\n(function %name%S(value) {\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, %method%(this.get(i, j), value));\n        }\n    }\n    return this;\n})\n";
  var inplaceMethodWithOneArgMatrix = "\n(function %name%M(matrix) {\n    matrix = this.constructor.checkMatrix(matrix);\n    if (this.rows !== matrix.rows ||\n        this.columns !== matrix.columns) {\n        throw new RangeError('Matrices dimensions must be equal');\n    }\n    for (var i = 0; i < this.rows; i++) {\n        for (var j = 0; j < this.columns; j++) {\n            this.set(i, j, %method%(this.get(i, j), matrix.get(i, j)));\n        }\n    }\n    return this;\n})\n";
  var inplaceMethodWithOneArg = "\n(function %name%(value) {\n    if (typeof value === 'number') return this.%name%S(value);\n    return this.%name%M(value);\n})\n";
  var staticMethodWithOneArg = staticMethodWithArgs;
  var operators = [// Arithmetic operators
  ['+', 'add'], ['-', 'sub', 'subtract'], ['*', 'mul', 'multiply'], ['/', 'div', 'divide'], ['%', 'mod', 'modulus'], // Bitwise operators
  ['&', 'and'], ['|', 'or'], ['^', 'xor'], ['<<', 'leftShift'], ['>>', 'signPropagatingRightShift'], ['>>>', 'rightShift', 'zeroFillRightShift']];
  var i;
  var eval2 = eval; // eslint-disable-line no-eval

  for (var operator of operators) {
    var inplaceOp = eval2(fillTemplateFunction(inplaceOperator, {
      name: operator[1],
      op: operator[0]
    }));
    var inplaceOpS = eval2(fillTemplateFunction(inplaceOperatorScalar, {
      name: "".concat(operator[1], "S"),
      op: operator[0]
    }));
    var inplaceOpM = eval2(fillTemplateFunction(inplaceOperatorMatrix, {
      name: "".concat(operator[1], "M"),
      op: operator[0]
    }));
    var staticOp = eval2(fillTemplateFunction(staticOperator, {
      name: operator[1]
    }));

    for (i = 1; i < operator.length; i++) {
      Matrix.prototype[operator[i]] = inplaceOp;
      Matrix.prototype["".concat(operator[i], "S")] = inplaceOpS;
      Matrix.prototype["".concat(operator[i], "M")] = inplaceOpM;
      Matrix[operator[i]] = staticOp;
    }
  }

  var methods = [['~', 'not']];
  ['abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'cbrt', 'ceil', 'clz32', 'cos', 'cosh', 'exp', 'expm1', 'floor', 'fround', 'log', 'log1p', 'log10', 'log2', 'round', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc'].forEach(function (mathMethod) {
    methods.push(["Math.".concat(mathMethod), mathMethod]);
  });

  for (var method of methods) {
    var inplaceMeth = eval2(fillTemplateFunction(inplaceMethod, {
      name: method[1],
      method: method[0]
    }));
    var staticMeth = eval2(fillTemplateFunction(staticMethod, {
      name: method[1]
    }));

    for (i = 1; i < method.length; i++) {
      Matrix.prototype[method[i]] = inplaceMeth;
      Matrix[method[i]] = staticMeth;
    }
  }

  var methodsWithArgs = [['Math.pow', 1, 'pow']];

  for (var methodWithArg of methodsWithArgs) {
    var args = 'arg0';

    for (i = 1; i < methodWithArg[1]; i++) {
      args += ", arg".concat(i);
    }

    if (methodWithArg[1] !== 1) {
      var inplaceMethWithArgs = eval2(fillTemplateFunction(inplaceMethodWithArgs, {
        name: methodWithArg[2],
        method: methodWithArg[0],
        args: args
      }));
      var staticMethWithArgs = eval2(fillTemplateFunction(staticMethodWithArgs, {
        name: methodWithArg[2],
        args: args
      }));

      for (i = 2; i < methodWithArg.length; i++) {
        Matrix.prototype[methodWithArg[i]] = inplaceMethWithArgs;
        Matrix[methodWithArg[i]] = staticMethWithArgs;
      }
    } else {
      var tmplVar = {
        name: methodWithArg[2],
        args: args,
        method: methodWithArg[0]
      };
      var inplaceMethod2 = eval2(fillTemplateFunction(inplaceMethodWithOneArg, tmplVar));
      var inplaceMethodS = eval2(fillTemplateFunction(inplaceMethodWithOneArgScalar, tmplVar));
      var inplaceMethodM = eval2(fillTemplateFunction(inplaceMethodWithOneArgMatrix, tmplVar));
      var staticMethod2 = eval2(fillTemplateFunction(staticMethodWithOneArg, tmplVar));

      for (i = 2; i < methodWithArg.length; i++) {
        Matrix.prototype[methodWithArg[i]] = inplaceMethod2;
        Matrix.prototype["".concat(methodWithArg[i], "M")] = inplaceMethodM;
        Matrix.prototype["".concat(methodWithArg[i], "S")] = inplaceMethodS;
        Matrix[methodWithArg[i]] = staticMethod2;
      }
    }
  }

  function fillTemplateFunction(template, values) {
    for (var value in values) {
      template = template.replace(new RegExp("%".concat(value, "%"), 'g'), values[value]);
    }

    return template;
  }

  return Matrix;
}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/matrix.js


class matrix_Matrix extends AbstractMatrix(Array) {
  constructor(nRows, nColumns) {
    var i;

    if (arguments.length === 1 && typeof nRows === 'number') {
      return new Array(nRows);
    }

    if (matrix_Matrix.isMatrix(nRows)) {
      return nRows.clone();
    } else if (Number.isInteger(nRows) && nRows > 0) {
      // Create an empty matrix
      super(nRows);

      if (Number.isInteger(nColumns) && nColumns > 0) {
        for (i = 0; i < nRows; i++) {
          this[i] = new Array(nColumns);
        }
      } else {
        throw new TypeError('nColumns must be a positive integer');
      }
    } else if (Array.isArray(nRows)) {
      // Copy the values from the 2D array
      const matrix = nRows;
      nRows = matrix.length;
      nColumns = matrix[0].length;

      if (typeof nColumns !== 'number' || nColumns === 0) {
        throw new TypeError('Data must be a 2D array with at least one element');
      }

      super(nRows);

      for (i = 0; i < nRows; i++) {
        if (matrix[i].length !== nColumns) {
          throw new RangeError('Inconsistent array dimensions');
        }

        this[i] = [].concat(matrix[i]);
      }
    } else {
      throw new TypeError('First argument must be a positive number or an array');
    }

    this.rows = nRows;
    this.columns = nColumns;
    return this;
  }

  set(rowIndex, columnIndex, value) {
    this[rowIndex][columnIndex] = value;
    return this;
  }

  get(rowIndex, columnIndex) {
    return this[rowIndex][columnIndex];
  }
  /**
   * Removes a row from the given index
   * @param {number} index - Row index
   * @return {Matrix} this
   */


  removeRow(index) {
    checkRowIndex(this, index);

    if (this.rows === 1) {
      throw new RangeError('A matrix cannot have less than one row');
    }

    this.splice(index, 1);
    this.rows -= 1;
    return this;
  }
  /**
   * Adds a row at the given index
   * @param {number} [index = this.rows] - Row index
   * @param {Array|Matrix} array - Array or vector
   * @return {Matrix} this
   */


  addRow(index, array) {
    if (array === undefined) {
      array = index;
      index = this.rows;
    }

    checkRowIndex(this, index, true);
    array = checkRowVector(this, array, true);
    this.splice(index, 0, array);
    this.rows += 1;
    return this;
  }
  /**
   * Removes a column from the given index
   * @param {number} index - Column index
   * @return {Matrix} this
   */


  removeColumn(index) {
    checkColumnIndex(this, index);

    if (this.columns === 1) {
      throw new RangeError('A matrix cannot have less than one column');
    }

    for (var i = 0; i < this.rows; i++) {
      this[i].splice(index, 1);
    }

    this.columns -= 1;
    return this;
  }
  /**
   * Adds a column at the given index
   * @param {number} [index = this.columns] - Column index
   * @param {Array|Matrix} array - Array or vector
   * @return {Matrix} this
   */


  addColumn(index, array) {
    if (typeof array === 'undefined') {
      array = index;
      index = this.columns;
    }

    checkColumnIndex(this, index, true);
    array = checkColumnVector(this, array);

    for (var i = 0; i < this.rows; i++) {
      this[i].splice(index, 0, array[i]);
    }

    this.columns += 1;
    return this;
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/wrap/WrapperMatrix1D.js


class WrapperMatrix1D_WrapperMatrix1D extends AbstractMatrix() {
  /**
   * @class WrapperMatrix1D
   * @param {Array<number>} data
   * @param {object} [options]
   * @param {object} [options.rows = 1]
   */
  constructor(data) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      rows = 1
    } = options;

    if (data.length % rows !== 0) {
      throw new Error('the data length is not divisible by the number of rows');
    }

    super();
    this.rows = rows;
    this.columns = data.length / rows;
    this.data = data;
  }

  set(rowIndex, columnIndex, value) {
    var index = this._calculateIndex(rowIndex, columnIndex);

    this.data[index] = value;
    return this;
  }

  get(rowIndex, columnIndex) {
    var index = this._calculateIndex(rowIndex, columnIndex);

    return this.data[index];
  }

  _calculateIndex(row, column) {
    return row * this.columns + column;
  }

  static get [Symbol.species]() {
    return matrix_Matrix;
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/wrap/WrapperMatrix2D.js


class WrapperMatrix2D_WrapperMatrix2D extends AbstractMatrix() {
  /**
   * @class WrapperMatrix2D
   * @param {Array<Array<number>>} data
   */
  constructor(data) {
    super();
    this.data = data;
    this.rows = data.length;
    this.columns = data[0].length;
  }

  set(rowIndex, columnIndex, value) {
    this.data[rowIndex][columnIndex] = value;
    return this;
  }

  get(rowIndex, columnIndex) {
    return this.data[rowIndex][columnIndex];
  }

  static get [Symbol.species]() {
    return matrix_Matrix;
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/wrap/wrap.js


/**
 * @param {Array<Array<number>>|Array<number>} array
 * @param {object} [options]
 * @param {object} [options.rows = 1]
 * @return {WrapperMatrix1D|WrapperMatrix2D}
 */

function wrap(array, options) {
  if (Array.isArray(array)) {
    if (array[0] && Array.isArray(array[0])) {
      return new WrapperMatrix2D_WrapperMatrix2D(array);
    } else {
      return new WrapperMatrix1D_WrapperMatrix1D(array, options);
    }
  } else {
    throw new Error('the argument is not an array');
  }
}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/dc/qr.js


/**
 * @class QrDecomposition
 * @link https://github.com/lutzroeder/Mapack/blob/master/Source/QrDecomposition.cs
 * @param {Matrix} value
 */

class qr_QrDecomposition {
  constructor(value) {
    value = WrapperMatrix2D_WrapperMatrix2D.checkMatrix(value);
    var qr = value.clone();
    var m = value.rows;
    var n = value.columns;
    var rdiag = new Array(n);
    var i, j, k, s;

    for (k = 0; k < n; k++) {
      var nrm = 0;

      for (i = k; i < m; i++) {
        nrm = hypotenuse(nrm, qr.get(i, k));
      }

      if (nrm !== 0) {
        if (qr.get(k, k) < 0) {
          nrm = -nrm;
        }

        for (i = k; i < m; i++) {
          qr.set(i, k, qr.get(i, k) / nrm);
        }

        qr.set(k, k, qr.get(k, k) + 1);

        for (j = k + 1; j < n; j++) {
          s = 0;

          for (i = k; i < m; i++) {
            s += qr.get(i, k) * qr.get(i, j);
          }

          s = -s / qr.get(k, k);

          for (i = k; i < m; i++) {
            qr.set(i, j, qr.get(i, j) + s * qr.get(i, k));
          }
        }
      }

      rdiag[k] = -nrm;
    }

    this.QR = qr;
    this.Rdiag = rdiag;
  }
  /**
   * Solve a problem of least square (Ax=b) by using the QR decomposition. Useful when A is rectangular, but not working when A is singular.
   * Example : We search to approximate x, with A matrix shape m*n, x vector size n, b vector size m (m > n). We will use :
   * var qr = QrDecomposition(A);
   * var x = qr.solve(b);
   * @param {Matrix} value - Matrix 1D which is the vector b (in the equation Ax = b)
   * @return {Matrix} - The vector x
   */


  solve(value) {
    value = matrix_Matrix.checkMatrix(value);
    var qr = this.QR;
    var m = qr.rows;

    if (value.rows !== m) {
      throw new Error('Matrix row dimensions must agree');
    }

    if (!this.isFullRank()) {
      throw new Error('Matrix is rank deficient');
    }

    var count = value.columns;
    var X = value.clone();
    var n = qr.columns;
    var i, j, k, s;

    for (k = 0; k < n; k++) {
      for (j = 0; j < count; j++) {
        s = 0;

        for (i = k; i < m; i++) {
          s += qr[i][k] * X[i][j];
        }

        s = -s / qr[k][k];

        for (i = k; i < m; i++) {
          X[i][j] += s * qr[i][k];
        }
      }
    }

    for (k = n - 1; k >= 0; k--) {
      for (j = 0; j < count; j++) {
        X[k][j] /= this.Rdiag[k];
      }

      for (i = 0; i < k; i++) {
        for (j = 0; j < count; j++) {
          X[i][j] -= X[k][j] * qr[i][k];
        }
      }
    }

    return X.subMatrix(0, n - 1, 0, count - 1);
  }
  /**
   *
   * @return {boolean}
   */


  isFullRank() {
    var columns = this.QR.columns;

    for (var i = 0; i < columns; i++) {
      if (this.Rdiag[i] === 0) {
        return false;
      }
    }

    return true;
  }
  /**
   *
   * @return {Matrix}
   */


  get upperTriangularMatrix() {
    var qr = this.QR;
    var n = qr.columns;
    var X = new matrix_Matrix(n, n);
    var i, j;

    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        if (i < j) {
          X[i][j] = qr[i][j];
        } else if (i === j) {
          X[i][j] = this.Rdiag[i];
        } else {
          X[i][j] = 0;
        }
      }
    }

    return X;
  }
  /**
   *
   * @return {Matrix}
   */


  get orthogonalMatrix() {
    var qr = this.QR;
    var rows = qr.rows;
    var columns = qr.columns;
    var X = new matrix_Matrix(rows, columns);
    var i, j, k, s;

    for (k = columns - 1; k >= 0; k--) {
      for (i = 0; i < rows; i++) {
        X[i][k] = 0;
      }

      X[k][k] = 1;

      for (j = k; j < columns; j++) {
        if (qr[k][k] !== 0) {
          s = 0;

          for (i = k; i < rows; i++) {
            s += qr[i][k] * X[i][j];
          }

          s = -s / qr[k][k];

          for (i = k; i < rows; i++) {
            X[i][j] += s * qr[i][k];
          }
        }
      }
    }

    return X;
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/decompositions.js




/**
 * Computes the inverse of a Matrix
 * @param {Matrix} matrix
 * @param {boolean} [useSVD=false]
 * @return {Matrix}
 */

function inverse(matrix) {
  let useSVD = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  matrix = WrapperMatrix2D_WrapperMatrix2D.checkMatrix(matrix);

  if (useSVD) {
    return new svd_SingularValueDecomposition(matrix).inverse();
  } else {
    return solve(matrix, matrix_Matrix.eye(matrix.rows));
  }
}
/**
 *
 * @param {Matrix} leftHandSide
 * @param {Matrix} rightHandSide
 * @param {boolean} [useSVD = false]
 * @return {Matrix}
 */

function solve(leftHandSide, rightHandSide) {
  let useSVD = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;
  leftHandSide = WrapperMatrix2D_WrapperMatrix2D.checkMatrix(leftHandSide);
  rightHandSide = WrapperMatrix2D_WrapperMatrix2D.checkMatrix(rightHandSide);

  if (useSVD) {
    return new svd_SingularValueDecomposition(leftHandSide).solve(rightHandSide);
  } else {
    return leftHandSide.isSquare() ? new lu_LuDecomposition(leftHandSide).solve(rightHandSide) : new qr_QrDecomposition(leftHandSide).solve(rightHandSide);
  }
}
// EXTERNAL MODULE: ./node_modules/ml-array-max/lib-es6/index.js
var ml_array_max_lib_es6 = __webpack_require__(9);

// CONCATENATED MODULE: ./node_modules/ml-matrix/src/linearDependencies.js


 // function used by rowsDependencies

function xrange(n, exception) {
  var range = [];

  for (var i = 0; i < n; i++) {
    if (i !== exception) {
      range.push(i);
    }
  }

  return range;
} // function used by rowsDependencies


function dependenciesOneRow(error, matrix, index) {
  let thresholdValue = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10e-10;
  let thresholdError = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 10e-10;

  if (error > thresholdError) {
    return new Array(matrix.rows + 1).fill(0);
  } else {
    var returnArray = matrix.addRow(index, [0]);

    for (var i = 0; i < returnArray.rows; i++) {
      if (Math.abs(returnArray.get(i, 0)) < thresholdValue) {
        returnArray.set(i, 0, 0);
      }
    }

    return returnArray.to1DArray();
  }
}
/**
 * Creates a matrix which represents the dependencies between rows.
 * If a row is a linear combination of others rows, the result will be a row with the coefficients of this combination.
 * For example : for A = [[2, 0, 0, 1], [0, 1, 6, 0], [0, 3, 0, 1], [0, 0, 1, 0], [0, 1, 2, 0]], the result will be [[0, 0, 0, 0, 0], [0, 0, 0, 4, 1], [0, 0, 0, 0, 0], [0, 0.25, 0, 0, -0.25], [0, 1, 0, -4, 0]]
 * @param {Matrix} matrix
 * @param {Object} [options] includes thresholdValue and thresholdError.
 * @param {number} [options.thresholdValue = 10e-10] If an absolute value is inferior to this threshold, it will equals zero.
 * @param {number} [options.thresholdError = 10e-10] If the error is inferior to that threshold, the linear combination found is accepted and the row is dependent from other rows.
 * @return {Matrix} the matrix which represents the dependencies between rows.
 */


function linearDependencies(matrix) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    thresholdValue = 10e-10,
    thresholdError = 10e-10
  } = options;
  var n = matrix.rows;
  var results = new matrix_Matrix(n, n);

  for (var i = 0; i < n; i++) {
    var b = matrix_Matrix.columnVector(matrix.getRow(i));
    var Abis = matrix.subMatrixRow(xrange(n, i)).transposeView();
    var svd = new svd_SingularValueDecomposition(Abis);
    var x = svd.solve(b);
    var error = Object(ml_array_max_lib_es6["default"])(matrix_Matrix.sub(b, Abis.mmul(x)).abs().to1DArray());
    results.setRow(i, dependenciesOneRow(error, x, i, thresholdValue, thresholdError));
  }

  return results;
}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/dc/evd.js


/**
 * @class EigenvalueDecomposition
 * @link https://github.com/lutzroeder/Mapack/blob/master/Source/EigenvalueDecomposition.cs
 * @param {Matrix} matrix
 * @param {object} [options]
 * @param {boolean} [options.assumeSymmetric=false]
 */

class evd_EigenvalueDecomposition {
  constructor(matrix) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      assumeSymmetric = false
    } = options;
    matrix = WrapperMatrix2D_WrapperMatrix2D.checkMatrix(matrix);

    if (!matrix.isSquare()) {
      throw new Error('Matrix is not a square matrix');
    }

    var n = matrix.columns;
    var V = getFilled2DArray(n, n, 0);
    var d = new Array(n);
    var e = new Array(n);
    var value = matrix;
    var i, j;
    var isSymmetric = false;

    if (assumeSymmetric) {
      isSymmetric = true;
    } else {
      isSymmetric = matrix.isSymmetric();
    }

    if (isSymmetric) {
      for (i = 0; i < n; i++) {
        for (j = 0; j < n; j++) {
          V[i][j] = value.get(i, j);
        }
      }

      tred2(n, e, d, V);
      tql2(n, e, d, V);
    } else {
      var H = getFilled2DArray(n, n, 0);
      var ort = new Array(n);

      for (j = 0; j < n; j++) {
        for (i = 0; i < n; i++) {
          H[i][j] = value.get(i, j);
        }
      }

      orthes(n, H, ort, V);
      hqr2(n, e, d, V, H);
    }

    this.n = n;
    this.e = e;
    this.d = d;
    this.V = V;
  }
  /**
   *
   * @return {Array<number>}
   */


  get realEigenvalues() {
    return this.d;
  }
  /**
   *
   * @return {Array<number>}
   */


  get imaginaryEigenvalues() {
    return this.e;
  }
  /**
   *
   * @return {Matrix}
   */


  get eigenvectorMatrix() {
    if (!matrix_Matrix.isMatrix(this.V)) {
      this.V = new matrix_Matrix(this.V);
    }

    return this.V;
  }
  /**
   *
   * @return {Matrix}
   */


  get diagonalMatrix() {
    var n = this.n;
    var e = this.e;
    var d = this.d;
    var X = new matrix_Matrix(n, n);
    var i, j;

    for (i = 0; i < n; i++) {
      for (j = 0; j < n; j++) {
        X[i][j] = 0;
      }

      X[i][i] = d[i];

      if (e[i] > 0) {
        X[i][i + 1] = e[i];
      } else if (e[i] < 0) {
        X[i][i - 1] = e[i];
      }
    }

    return X;
  }

}

function tred2(n, e, d, V) {
  var f, g, h, i, j, k, hh, scale;

  for (j = 0; j < n; j++) {
    d[j] = V[n - 1][j];
  }

  for (i = n - 1; i > 0; i--) {
    scale = 0;
    h = 0;

    for (k = 0; k < i; k++) {
      scale = scale + Math.abs(d[k]);
    }

    if (scale === 0) {
      e[i] = d[i - 1];

      for (j = 0; j < i; j++) {
        d[j] = V[i - 1][j];
        V[i][j] = 0;
        V[j][i] = 0;
      }
    } else {
      for (k = 0; k < i; k++) {
        d[k] /= scale;
        h += d[k] * d[k];
      }

      f = d[i - 1];
      g = Math.sqrt(h);

      if (f > 0) {
        g = -g;
      }

      e[i] = scale * g;
      h = h - f * g;
      d[i - 1] = f - g;

      for (j = 0; j < i; j++) {
        e[j] = 0;
      }

      for (j = 0; j < i; j++) {
        f = d[j];
        V[j][i] = f;
        g = e[j] + V[j][j] * f;

        for (k = j + 1; k <= i - 1; k++) {
          g += V[k][j] * d[k];
          e[k] += V[k][j] * f;
        }

        e[j] = g;
      }

      f = 0;

      for (j = 0; j < i; j++) {
        e[j] /= h;
        f += e[j] * d[j];
      }

      hh = f / (h + h);

      for (j = 0; j < i; j++) {
        e[j] -= hh * d[j];
      }

      for (j = 0; j < i; j++) {
        f = d[j];
        g = e[j];

        for (k = j; k <= i - 1; k++) {
          V[k][j] -= f * e[k] + g * d[k];
        }

        d[j] = V[i - 1][j];
        V[i][j] = 0;
      }
    }

    d[i] = h;
  }

  for (i = 0; i < n - 1; i++) {
    V[n - 1][i] = V[i][i];
    V[i][i] = 1;
    h = d[i + 1];

    if (h !== 0) {
      for (k = 0; k <= i; k++) {
        d[k] = V[k][i + 1] / h;
      }

      for (j = 0; j <= i; j++) {
        g = 0;

        for (k = 0; k <= i; k++) {
          g += V[k][i + 1] * V[k][j];
        }

        for (k = 0; k <= i; k++) {
          V[k][j] -= g * d[k];
        }
      }
    }

    for (k = 0; k <= i; k++) {
      V[k][i + 1] = 0;
    }
  }

  for (j = 0; j < n; j++) {
    d[j] = V[n - 1][j];
    V[n - 1][j] = 0;
  }

  V[n - 1][n - 1] = 1;
  e[0] = 0;
}

function tql2(n, e, d, V) {
  var g, h, i, j, k, l, m, p, r, dl1, c, c2, c3, el1, s, s2, iter;

  for (i = 1; i < n; i++) {
    e[i - 1] = e[i];
  }

  e[n - 1] = 0;
  var f = 0;
  var tst1 = 0;
  var eps = Number.EPSILON;

  for (l = 0; l < n; l++) {
    tst1 = Math.max(tst1, Math.abs(d[l]) + Math.abs(e[l]));
    m = l;

    while (m < n) {
      if (Math.abs(e[m]) <= eps * tst1) {
        break;
      }

      m++;
    }

    if (m > l) {
      iter = 0;

      do {
        iter = iter + 1;
        g = d[l];
        p = (d[l + 1] - g) / (2 * e[l]);
        r = hypotenuse(p, 1);

        if (p < 0) {
          r = -r;
        }

        d[l] = e[l] / (p + r);
        d[l + 1] = e[l] * (p + r);
        dl1 = d[l + 1];
        h = g - d[l];

        for (i = l + 2; i < n; i++) {
          d[i] -= h;
        }

        f = f + h;
        p = d[m];
        c = 1;
        c2 = c;
        c3 = c;
        el1 = e[l + 1];
        s = 0;
        s2 = 0;

        for (i = m - 1; i >= l; i--) {
          c3 = c2;
          c2 = c;
          s2 = s;
          g = c * e[i];
          h = c * p;
          r = hypotenuse(p, e[i]);
          e[i + 1] = s * r;
          s = e[i] / r;
          c = p / r;
          p = c * d[i] - s * g;
          d[i + 1] = h + s * (c * g + s * d[i]);

          for (k = 0; k < n; k++) {
            h = V[k][i + 1];
            V[k][i + 1] = s * V[k][i] + c * h;
            V[k][i] = c * V[k][i] - s * h;
          }
        }

        p = -s * s2 * c3 * el1 * e[l] / dl1;
        e[l] = s * p;
        d[l] = c * p;
      } while (Math.abs(e[l]) > eps * tst1);
    }

    d[l] = d[l] + f;
    e[l] = 0;
  }

  for (i = 0; i < n - 1; i++) {
    k = i;
    p = d[i];

    for (j = i + 1; j < n; j++) {
      if (d[j] < p) {
        k = j;
        p = d[j];
      }
    }

    if (k !== i) {
      d[k] = d[i];
      d[i] = p;

      for (j = 0; j < n; j++) {
        p = V[j][i];
        V[j][i] = V[j][k];
        V[j][k] = p;
      }
    }
  }
}

function orthes(n, H, ort, V) {
  var low = 0;
  var high = n - 1;
  var f, g, h, i, j, m;
  var scale;

  for (m = low + 1; m <= high - 1; m++) {
    scale = 0;

    for (i = m; i <= high; i++) {
      scale = scale + Math.abs(H[i][m - 1]);
    }

    if (scale !== 0) {
      h = 0;

      for (i = high; i >= m; i--) {
        ort[i] = H[i][m - 1] / scale;
        h += ort[i] * ort[i];
      }

      g = Math.sqrt(h);

      if (ort[m] > 0) {
        g = -g;
      }

      h = h - ort[m] * g;
      ort[m] = ort[m] - g;

      for (j = m; j < n; j++) {
        f = 0;

        for (i = high; i >= m; i--) {
          f += ort[i] * H[i][j];
        }

        f = f / h;

        for (i = m; i <= high; i++) {
          H[i][j] -= f * ort[i];
        }
      }

      for (i = 0; i <= high; i++) {
        f = 0;

        for (j = high; j >= m; j--) {
          f += ort[j] * H[i][j];
        }

        f = f / h;

        for (j = m; j <= high; j++) {
          H[i][j] -= f * ort[j];
        }
      }

      ort[m] = scale * ort[m];
      H[m][m - 1] = scale * g;
    }
  }

  for (i = 0; i < n; i++) {
    for (j = 0; j < n; j++) {
      V[i][j] = i === j ? 1 : 0;
    }
  }

  for (m = high - 1; m >= low + 1; m--) {
    if (H[m][m - 1] !== 0) {
      for (i = m + 1; i <= high; i++) {
        ort[i] = H[i][m - 1];
      }

      for (j = m; j <= high; j++) {
        g = 0;

        for (i = m; i <= high; i++) {
          g += ort[i] * V[i][j];
        }

        g = g / ort[m] / H[m][m - 1];

        for (i = m; i <= high; i++) {
          V[i][j] += g * ort[i];
        }
      }
    }
  }
}

function hqr2(nn, e, d, V, H) {
  var n = nn - 1;
  var low = 0;
  var high = nn - 1;
  var eps = Number.EPSILON;
  var exshift = 0;
  var norm = 0;
  var p = 0;
  var q = 0;
  var r = 0;
  var s = 0;
  var z = 0;
  var iter = 0;
  var i, j, k, l, m, t, w, x, y;
  var ra, sa, vr, vi;
  var notlast, cdivres;

  for (i = 0; i < nn; i++) {
    if (i < low || i > high) {
      d[i] = H[i][i];
      e[i] = 0;
    }

    for (j = Math.max(i - 1, 0); j < nn; j++) {
      norm = norm + Math.abs(H[i][j]);
    }
  }

  while (n >= low) {
    l = n;

    while (l > low) {
      s = Math.abs(H[l - 1][l - 1]) + Math.abs(H[l][l]);

      if (s === 0) {
        s = norm;
      }

      if (Math.abs(H[l][l - 1]) < eps * s) {
        break;
      }

      l--;
    }

    if (l === n) {
      H[n][n] = H[n][n] + exshift;
      d[n] = H[n][n];
      e[n] = 0;
      n--;
      iter = 0;
    } else if (l === n - 1) {
      w = H[n][n - 1] * H[n - 1][n];
      p = (H[n - 1][n - 1] - H[n][n]) / 2;
      q = p * p + w;
      z = Math.sqrt(Math.abs(q));
      H[n][n] = H[n][n] + exshift;
      H[n - 1][n - 1] = H[n - 1][n - 1] + exshift;
      x = H[n][n];

      if (q >= 0) {
        z = p >= 0 ? p + z : p - z;
        d[n - 1] = x + z;
        d[n] = d[n - 1];

        if (z !== 0) {
          d[n] = x - w / z;
        }

        e[n - 1] = 0;
        e[n] = 0;
        x = H[n][n - 1];
        s = Math.abs(x) + Math.abs(z);
        p = x / s;
        q = z / s;
        r = Math.sqrt(p * p + q * q);
        p = p / r;
        q = q / r;

        for (j = n - 1; j < nn; j++) {
          z = H[n - 1][j];
          H[n - 1][j] = q * z + p * H[n][j];
          H[n][j] = q * H[n][j] - p * z;
        }

        for (i = 0; i <= n; i++) {
          z = H[i][n - 1];
          H[i][n - 1] = q * z + p * H[i][n];
          H[i][n] = q * H[i][n] - p * z;
        }

        for (i = low; i <= high; i++) {
          z = V[i][n - 1];
          V[i][n - 1] = q * z + p * V[i][n];
          V[i][n] = q * V[i][n] - p * z;
        }
      } else {
        d[n - 1] = x + p;
        d[n] = x + p;
        e[n - 1] = z;
        e[n] = -z;
      }

      n = n - 2;
      iter = 0;
    } else {
      x = H[n][n];
      y = 0;
      w = 0;

      if (l < n) {
        y = H[n - 1][n - 1];
        w = H[n][n - 1] * H[n - 1][n];
      }

      if (iter === 10) {
        exshift += x;

        for (i = low; i <= n; i++) {
          H[i][i] -= x;
        }

        s = Math.abs(H[n][n - 1]) + Math.abs(H[n - 1][n - 2]);
        x = y = 0.75 * s;
        w = -0.4375 * s * s;
      }

      if (iter === 30) {
        s = (y - x) / 2;
        s = s * s + w;

        if (s > 0) {
          s = Math.sqrt(s);

          if (y < x) {
            s = -s;
          }

          s = x - w / ((y - x) / 2 + s);

          for (i = low; i <= n; i++) {
            H[i][i] -= s;
          }

          exshift += s;
          x = y = w = 0.964;
        }
      }

      iter = iter + 1;
      m = n - 2;

      while (m >= l) {
        z = H[m][m];
        r = x - z;
        s = y - z;
        p = (r * s - w) / H[m + 1][m] + H[m][m + 1];
        q = H[m + 1][m + 1] - z - r - s;
        r = H[m + 2][m + 1];
        s = Math.abs(p) + Math.abs(q) + Math.abs(r);
        p = p / s;
        q = q / s;
        r = r / s;

        if (m === l) {
          break;
        }

        if (Math.abs(H[m][m - 1]) * (Math.abs(q) + Math.abs(r)) < eps * (Math.abs(p) * (Math.abs(H[m - 1][m - 1]) + Math.abs(z) + Math.abs(H[m + 1][m + 1])))) {
          break;
        }

        m--;
      }

      for (i = m + 2; i <= n; i++) {
        H[i][i - 2] = 0;

        if (i > m + 2) {
          H[i][i - 3] = 0;
        }
      }

      for (k = m; k <= n - 1; k++) {
        notlast = k !== n - 1;

        if (k !== m) {
          p = H[k][k - 1];
          q = H[k + 1][k - 1];
          r = notlast ? H[k + 2][k - 1] : 0;
          x = Math.abs(p) + Math.abs(q) + Math.abs(r);

          if (x !== 0) {
            p = p / x;
            q = q / x;
            r = r / x;
          }
        }

        if (x === 0) {
          break;
        }

        s = Math.sqrt(p * p + q * q + r * r);

        if (p < 0) {
          s = -s;
        }

        if (s !== 0) {
          if (k !== m) {
            H[k][k - 1] = -s * x;
          } else if (l !== m) {
            H[k][k - 1] = -H[k][k - 1];
          }

          p = p + s;
          x = p / s;
          y = q / s;
          z = r / s;
          q = q / p;
          r = r / p;

          for (j = k; j < nn; j++) {
            p = H[k][j] + q * H[k + 1][j];

            if (notlast) {
              p = p + r * H[k + 2][j];
              H[k + 2][j] = H[k + 2][j] - p * z;
            }

            H[k][j] = H[k][j] - p * x;
            H[k + 1][j] = H[k + 1][j] - p * y;
          }

          for (i = 0; i <= Math.min(n, k + 3); i++) {
            p = x * H[i][k] + y * H[i][k + 1];

            if (notlast) {
              p = p + z * H[i][k + 2];
              H[i][k + 2] = H[i][k + 2] - p * r;
            }

            H[i][k] = H[i][k] - p;
            H[i][k + 1] = H[i][k + 1] - p * q;
          }

          for (i = low; i <= high; i++) {
            p = x * V[i][k] + y * V[i][k + 1];

            if (notlast) {
              p = p + z * V[i][k + 2];
              V[i][k + 2] = V[i][k + 2] - p * r;
            }

            V[i][k] = V[i][k] - p;
            V[i][k + 1] = V[i][k + 1] - p * q;
          }
        }
      }
    }
  }

  if (norm === 0) {
    return;
  }

  for (n = nn - 1; n >= 0; n--) {
    p = d[n];
    q = e[n];

    if (q === 0) {
      l = n;
      H[n][n] = 1;

      for (i = n - 1; i >= 0; i--) {
        w = H[i][i] - p;
        r = 0;

        for (j = l; j <= n; j++) {
          r = r + H[i][j] * H[j][n];
        }

        if (e[i] < 0) {
          z = w;
          s = r;
        } else {
          l = i;

          if (e[i] === 0) {
            H[i][n] = w !== 0 ? -r / w : -r / (eps * norm);
          } else {
            x = H[i][i + 1];
            y = H[i + 1][i];
            q = (d[i] - p) * (d[i] - p) + e[i] * e[i];
            t = (x * s - z * r) / q;
            H[i][n] = t;
            H[i + 1][n] = Math.abs(x) > Math.abs(z) ? (-r - w * t) / x : (-s - y * t) / z;
          }

          t = Math.abs(H[i][n]);

          if (eps * t * t > 1) {
            for (j = i; j <= n; j++) {
              H[j][n] = H[j][n] / t;
            }
          }
        }
      }
    } else if (q < 0) {
      l = n - 1;

      if (Math.abs(H[n][n - 1]) > Math.abs(H[n - 1][n])) {
        H[n - 1][n - 1] = q / H[n][n - 1];
        H[n - 1][n] = -(H[n][n] - p) / H[n][n - 1];
      } else {
        cdivres = cdiv(0, -H[n - 1][n], H[n - 1][n - 1] - p, q);
        H[n - 1][n - 1] = cdivres[0];
        H[n - 1][n] = cdivres[1];
      }

      H[n][n - 1] = 0;
      H[n][n] = 1;

      for (i = n - 2; i >= 0; i--) {
        ra = 0;
        sa = 0;

        for (j = l; j <= n; j++) {
          ra = ra + H[i][j] * H[j][n - 1];
          sa = sa + H[i][j] * H[j][n];
        }

        w = H[i][i] - p;

        if (e[i] < 0) {
          z = w;
          r = ra;
          s = sa;
        } else {
          l = i;

          if (e[i] === 0) {
            cdivres = cdiv(-ra, -sa, w, q);
            H[i][n - 1] = cdivres[0];
            H[i][n] = cdivres[1];
          } else {
            x = H[i][i + 1];
            y = H[i + 1][i];
            vr = (d[i] - p) * (d[i] - p) + e[i] * e[i] - q * q;
            vi = (d[i] - p) * 2 * q;

            if (vr === 0 && vi === 0) {
              vr = eps * norm * (Math.abs(w) + Math.abs(q) + Math.abs(x) + Math.abs(y) + Math.abs(z));
            }

            cdivres = cdiv(x * r - z * ra + q * sa, x * s - z * sa - q * ra, vr, vi);
            H[i][n - 1] = cdivres[0];
            H[i][n] = cdivres[1];

            if (Math.abs(x) > Math.abs(z) + Math.abs(q)) {
              H[i + 1][n - 1] = (-ra - w * H[i][n - 1] + q * H[i][n]) / x;
              H[i + 1][n] = (-sa - w * H[i][n] - q * H[i][n - 1]) / x;
            } else {
              cdivres = cdiv(-r - y * H[i][n - 1], -s - y * H[i][n], z, q);
              H[i + 1][n - 1] = cdivres[0];
              H[i + 1][n] = cdivres[1];
            }
          }

          t = Math.max(Math.abs(H[i][n - 1]), Math.abs(H[i][n]));

          if (eps * t * t > 1) {
            for (j = i; j <= n; j++) {
              H[j][n - 1] = H[j][n - 1] / t;
              H[j][n] = H[j][n] / t;
            }
          }
        }
      }
    }
  }

  for (i = 0; i < nn; i++) {
    if (i < low || i > high) {
      for (j = i; j < nn; j++) {
        V[i][j] = H[i][j];
      }
    }
  }

  for (j = nn - 1; j >= low; j--) {
    for (i = low; i <= high; i++) {
      z = 0;

      for (k = low; k <= Math.min(j, high); k++) {
        z = z + V[i][k] * H[k][j];
      }

      V[i][j] = z;
    }
  }
}

function cdiv(xr, xi, yr, yi) {
  var r, d;

  if (Math.abs(yr) > Math.abs(yi)) {
    r = yi / yr;
    d = yr + r * yi;
    return [(xr + r * xi) / d, (xi - r * xr) / d];
  } else {
    r = yr / yi;
    d = yi + r * yr;
    return [(r * xr + xi) / d, (r * xi - xr) / d];
  }
}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/dc/cholesky.js

/**
 * @class CholeskyDecomposition
 * @link https://github.com/lutzroeder/Mapack/blob/master/Source/CholeskyDecomposition.cs
 * @param {Matrix} value
 */

class cholesky_CholeskyDecomposition {
  constructor(value) {
    value = WrapperMatrix2D_WrapperMatrix2D.checkMatrix(value);

    if (!value.isSymmetric()) {
      throw new Error('Matrix is not symmetric');
    }

    var a = value;
    var dimension = a.rows;
    var l = new matrix_Matrix(dimension, dimension);
    var positiveDefinite = true;
    var i, j, k;

    for (j = 0; j < dimension; j++) {
      var Lrowj = l[j];
      var d = 0;

      for (k = 0; k < j; k++) {
        var Lrowk = l[k];
        var s = 0;

        for (i = 0; i < k; i++) {
          s += Lrowk[i] * Lrowj[i];
        }

        Lrowj[k] = s = (a.get(j, k) - s) / l[k][k];
        d = d + s * s;
      }

      d = a.get(j, j) - d;
      positiveDefinite &= d > 0;
      l[j][j] = Math.sqrt(Math.max(d, 0));

      for (k = j + 1; k < dimension; k++) {
        l[j][k] = 0;
      }
    }

    if (!positiveDefinite) {
      throw new Error('Matrix is not positive definite');
    }

    this.L = l;
  }
  /**
   *
   * @param {Matrix} value
   * @return {Matrix}
   */


  solve(value) {
    value = WrapperMatrix2D_WrapperMatrix2D.checkMatrix(value);
    var l = this.L;
    var dimension = l.rows;

    if (value.rows !== dimension) {
      throw new Error('Matrix dimensions do not match');
    }

    var count = value.columns;
    var B = value.clone();
    var i, j, k;

    for (k = 0; k < dimension; k++) {
      for (j = 0; j < count; j++) {
        for (i = 0; i < k; i++) {
          B[k][j] -= B[i][j] * l[k][i];
        }

        B[k][j] /= l[k][k];
      }
    }

    for (k = dimension - 1; k >= 0; k--) {
      for (j = 0; j < count; j++) {
        for (i = k + 1; i < dimension; i++) {
          B[k][j] -= B[i][j] * l[i][k];
        }

        B[k][j] /= l[k][k];
      }
    }

    return B;
  }
  /**
   *
   * @return {Matrix}
   */


  get lowerTriangularMatrix() {
    return this.L;
  }

}
// CONCATENATED MODULE: ./node_modules/ml-matrix/src/index.js
/* concated harmony reexport default */__webpack_require__.d(__webpack_exports__, "default", function() { return matrix_Matrix; });
/* concated harmony reexport Matrix */__webpack_require__.d(__webpack_exports__, "Matrix", function() { return matrix_Matrix; });
/* concated harmony reexport abstractMatrix */__webpack_require__.d(__webpack_exports__, "abstractMatrix", function() { return AbstractMatrix; });
/* concated harmony reexport wrap */__webpack_require__.d(__webpack_exports__, "wrap", function() { return wrap; });
/* concated harmony reexport WrapperMatrix2D */__webpack_require__.d(__webpack_exports__, "WrapperMatrix2D", function() { return WrapperMatrix2D_WrapperMatrix2D; });
/* concated harmony reexport WrapperMatrix1D */__webpack_require__.d(__webpack_exports__, "WrapperMatrix1D", function() { return WrapperMatrix1D_WrapperMatrix1D; });
/* concated harmony reexport solve */__webpack_require__.d(__webpack_exports__, "solve", function() { return solve; });
/* concated harmony reexport inverse */__webpack_require__.d(__webpack_exports__, "inverse", function() { return inverse; });
/* concated harmony reexport linearDependencies */__webpack_require__.d(__webpack_exports__, "linearDependencies", function() { return linearDependencies; });
/* concated harmony reexport SingularValueDecomposition */__webpack_require__.d(__webpack_exports__, "SingularValueDecomposition", function() { return svd_SingularValueDecomposition; });
/* concated harmony reexport SVD */__webpack_require__.d(__webpack_exports__, "SVD", function() { return svd_SingularValueDecomposition; });
/* concated harmony reexport EigenvalueDecomposition */__webpack_require__.d(__webpack_exports__, "EigenvalueDecomposition", function() { return evd_EigenvalueDecomposition; });
/* concated harmony reexport EVD */__webpack_require__.d(__webpack_exports__, "EVD", function() { return evd_EigenvalueDecomposition; });
/* concated harmony reexport CholeskyDecomposition */__webpack_require__.d(__webpack_exports__, "CholeskyDecomposition", function() { return cholesky_CholeskyDecomposition; });
/* concated harmony reexport CHO */__webpack_require__.d(__webpack_exports__, "CHO", function() { return cholesky_CholeskyDecomposition; });
/* concated harmony reexport LuDecomposition */__webpack_require__.d(__webpack_exports__, "LuDecomposition", function() { return lu_LuDecomposition; });
/* concated harmony reexport LU */__webpack_require__.d(__webpack_exports__, "LU", function() { return lu_LuDecomposition; });
/* concated harmony reexport QrDecomposition */__webpack_require__.d(__webpack_exports__, "QrDecomposition", function() { return qr_QrDecomposition; });
/* concated harmony reexport QR */__webpack_require__.d(__webpack_exports__, "QR", function() { return qr_QrDecomposition; });













/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const toString = Object.prototype.toString;

function isAnyArray(object) {
  return toString.call(object).endsWith('Array]');
}

module.exports = isAnyArray;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function squaredEuclidean(p, q) {
  var d = 0;

  for (var i = 0; i < p.length; i++) {
    d += (p[i] - q[i]) * (p[i] - q[i]);
  }

  return d;
}

function euclidean(p, q) {
  return Math.sqrt(squaredEuclidean(p, q));
}

module.exports = euclidean;
euclidean.squared = squaredEuclidean;

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.array = __webpack_require__(22);
exports.matrix = __webpack_require__(4);

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var arrayStat = __webpack_require__(22);

function compareNumbers(a, b) {
  return a - b;
}

exports.max = function max(matrix) {
  var max = -Infinity;

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] > max) max = matrix[i][j];
    }
  }

  return max;
};

exports.min = function min(matrix) {
  var min = Infinity;

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] < min) min = matrix[i][j];
    }
  }

  return min;
};

exports.minMax = function minMax(matrix) {
  var min = Infinity;
  var max = -Infinity;

  for (var i = 0; i < matrix.length; i++) {
    for (var j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] < min) min = matrix[i][j];
      if (matrix[i][j] > max) max = matrix[i][j];
    }
  }

  return {
    min: min,
    max: max
  };
};

exports.entropy = function entropy(matrix, eps) {
  if (typeof eps === 'undefined') {
    eps = 0;
  }

  var sum = 0,
      l1 = matrix.length,
      l2 = matrix[0].length;

  for (var i = 0; i < l1; i++) {
    for (var j = 0; j < l2; j++) {
      sum += matrix[i][j] * Math.log(matrix[i][j] + eps);
    }
  }

  return -sum;
};

exports.mean = function mean(matrix, dimension) {
  if (typeof dimension === 'undefined') {
    dimension = 0;
  }

  var rows = matrix.length,
      cols = matrix[0].length,
      theMean,
      N,
      i,
      j;

  if (dimension === -1) {
    theMean = [0];
    N = rows * cols;

    for (i = 0; i < rows; i++) {
      for (j = 0; j < cols; j++) {
        theMean[0] += matrix[i][j];
      }
    }

    theMean[0] /= N;
  } else if (dimension === 0) {
    theMean = new Array(cols);
    N = rows;

    for (j = 0; j < cols; j++) {
      theMean[j] = 0;

      for (i = 0; i < rows; i++) {
        theMean[j] += matrix[i][j];
      }

      theMean[j] /= N;
    }
  } else if (dimension === 1) {
    theMean = new Array(rows);
    N = cols;

    for (j = 0; j < rows; j++) {
      theMean[j] = 0;

      for (i = 0; i < cols; i++) {
        theMean[j] += matrix[j][i];
      }

      theMean[j] /= N;
    }
  } else {
    throw new Error('Invalid dimension');
  }

  return theMean;
};

exports.sum = function sum(matrix, dimension) {
  if (typeof dimension === 'undefined') {
    dimension = 0;
  }

  var rows = matrix.length,
      cols = matrix[0].length,
      theSum,
      i,
      j;

  if (dimension === -1) {
    theSum = [0];

    for (i = 0; i < rows; i++) {
      for (j = 0; j < cols; j++) {
        theSum[0] += matrix[i][j];
      }
    }
  } else if (dimension === 0) {
    theSum = new Array(cols);

    for (j = 0; j < cols; j++) {
      theSum[j] = 0;

      for (i = 0; i < rows; i++) {
        theSum[j] += matrix[i][j];
      }
    }
  } else if (dimension === 1) {
    theSum = new Array(rows);

    for (j = 0; j < rows; j++) {
      theSum[j] = 0;

      for (i = 0; i < cols; i++) {
        theSum[j] += matrix[j][i];
      }
    }
  } else {
    throw new Error('Invalid dimension');
  }

  return theSum;
};

exports.product = function product(matrix, dimension) {
  if (typeof dimension === 'undefined') {
    dimension = 0;
  }

  var rows = matrix.length,
      cols = matrix[0].length,
      theProduct,
      i,
      j;

  if (dimension === -1) {
    theProduct = [1];

    for (i = 0; i < rows; i++) {
      for (j = 0; j < cols; j++) {
        theProduct[0] *= matrix[i][j];
      }
    }
  } else if (dimension === 0) {
    theProduct = new Array(cols);

    for (j = 0; j < cols; j++) {
      theProduct[j] = 1;

      for (i = 0; i < rows; i++) {
        theProduct[j] *= matrix[i][j];
      }
    }
  } else if (dimension === 1) {
    theProduct = new Array(rows);

    for (j = 0; j < rows; j++) {
      theProduct[j] = 1;

      for (i = 0; i < cols; i++) {
        theProduct[j] *= matrix[j][i];
      }
    }
  } else {
    throw new Error('Invalid dimension');
  }

  return theProduct;
};

exports.standardDeviation = function standardDeviation(matrix, means, unbiased) {
  var vari = exports.variance(matrix, means, unbiased),
      l = vari.length;

  for (var i = 0; i < l; i++) {
    vari[i] = Math.sqrt(vari[i]);
  }

  return vari;
};

exports.variance = function variance(matrix, means, unbiased) {
  if (typeof unbiased === 'undefined') {
    unbiased = true;
  }

  means = means || exports.mean(matrix);
  var rows = matrix.length;
  if (rows === 0) return [];
  var cols = matrix[0].length;
  var vari = new Array(cols);

  for (var j = 0; j < cols; j++) {
    var sum1 = 0,
        sum2 = 0,
        x = 0;

    for (var i = 0; i < rows; i++) {
      x = matrix[i][j] - means[j];
      sum1 += x;
      sum2 += x * x;
    }

    if (unbiased) {
      vari[j] = (sum2 - sum1 * sum1 / rows) / (rows - 1);
    } else {
      vari[j] = (sum2 - sum1 * sum1 / rows) / rows;
    }
  }

  return vari;
};

exports.median = function median(matrix) {
  var rows = matrix.length,
      cols = matrix[0].length;
  var medians = new Array(cols);

  for (var i = 0; i < cols; i++) {
    var data = new Array(rows);

    for (var j = 0; j < rows; j++) {
      data[j] = matrix[j][i];
    }

    data.sort(compareNumbers);
    var N = data.length;

    if (N % 2 === 0) {
      medians[i] = (data[N / 2] + data[N / 2 - 1]) * 0.5;
    } else {
      medians[i] = data[Math.floor(N / 2)];
    }
  }

  return medians;
};

exports.mode = function mode(matrix) {
  var rows = matrix.length,
      cols = matrix[0].length,
      modes = new Array(cols),
      i,
      j;

  for (i = 0; i < cols; i++) {
    var itemCount = new Array(rows);

    for (var k = 0; k < rows; k++) {
      itemCount[k] = 0;
    }

    var itemArray = new Array(rows);
    var count = 0;

    for (j = 0; j < rows; j++) {
      var index = itemArray.indexOf(matrix[j][i]);

      if (index >= 0) {
        itemCount[index]++;
      } else {
        itemArray[count] = matrix[j][i];
        itemCount[count] = 1;
        count++;
      }
    }

    var maxValue = 0,
        maxIndex = 0;

    for (j = 0; j < count; j++) {
      if (itemCount[j] > maxValue) {
        maxValue = itemCount[j];
        maxIndex = j;
      }
    }

    modes[i] = itemArray[maxIndex];
  }

  return modes;
};

exports.skewness = function skewness(matrix, unbiased) {
  if (typeof unbiased === 'undefined') unbiased = true;
  var means = exports.mean(matrix);
  var n = matrix.length,
      l = means.length;
  var skew = new Array(l);

  for (var j = 0; j < l; j++) {
    var s2 = 0,
        s3 = 0;

    for (var i = 0; i < n; i++) {
      var dev = matrix[i][j] - means[j];
      s2 += dev * dev;
      s3 += dev * dev * dev;
    }

    var m2 = s2 / n;
    var m3 = s3 / n;
    var g = m3 / Math.pow(m2, 3 / 2);

    if (unbiased) {
      var a = Math.sqrt(n * (n - 1));
      var b = n - 2;
      skew[j] = a / b * g;
    } else {
      skew[j] = g;
    }
  }

  return skew;
};

exports.kurtosis = function kurtosis(matrix, unbiased) {
  if (typeof unbiased === 'undefined') unbiased = true;
  var means = exports.mean(matrix);
  var n = matrix.length,
      m = matrix[0].length;
  var kurt = new Array(m);

  for (var j = 0; j < m; j++) {
    var s2 = 0,
        s4 = 0;

    for (var i = 0; i < n; i++) {
      var dev = matrix[i][j] - means[j];
      s2 += dev * dev;
      s4 += dev * dev * dev * dev;
    }

    var m2 = s2 / n;
    var m4 = s4 / n;

    if (unbiased) {
      var v = s2 / (n - 1);
      var a = n * (n + 1) / ((n - 1) * (n - 2) * (n - 3));
      var b = s4 / (v * v);
      var c = (n - 1) * (n - 1) / ((n - 2) * (n - 3));
      kurt[j] = a * b - 3 * c;
    } else {
      kurt[j] = m4 / (m2 * m2) - 3;
    }
  }

  return kurt;
};

exports.standardError = function standardError(matrix) {
  var samples = matrix.length;
  var standardDeviations = exports.standardDeviation(matrix);
  var l = standardDeviations.length;
  var standardErrors = new Array(l);
  var sqrtN = Math.sqrt(samples);

  for (var i = 0; i < l; i++) {
    standardErrors[i] = standardDeviations[i] / sqrtN;
  }

  return standardErrors;
};

exports.covariance = function covariance(matrix, dimension) {
  return exports.scatter(matrix, undefined, dimension);
};

exports.scatter = function scatter(matrix, divisor, dimension) {
  if (typeof dimension === 'undefined') {
    dimension = 0;
  }

  if (typeof divisor === 'undefined') {
    if (dimension === 0) {
      divisor = matrix.length - 1;
    } else if (dimension === 1) {
      divisor = matrix[0].length - 1;
    }
  }

  var means = exports.mean(matrix, dimension);
  var rows = matrix.length;

  if (rows === 0) {
    return [[]];
  }

  var cols = matrix[0].length,
      cov,
      i,
      j,
      s,
      k;

  if (dimension === 0) {
    cov = new Array(cols);

    for (i = 0; i < cols; i++) {
      cov[i] = new Array(cols);
    }

    for (i = 0; i < cols; i++) {
      for (j = i; j < cols; j++) {
        s = 0;

        for (k = 0; k < rows; k++) {
          s += (matrix[k][j] - means[j]) * (matrix[k][i] - means[i]);
        }

        s /= divisor;
        cov[i][j] = s;
        cov[j][i] = s;
      }
    }
  } else if (dimension === 1) {
    cov = new Array(rows);

    for (i = 0; i < rows; i++) {
      cov[i] = new Array(rows);
    }

    for (i = 0; i < rows; i++) {
      for (j = i; j < rows; j++) {
        s = 0;

        for (k = 0; k < cols; k++) {
          s += (matrix[j][k] - means[j]) * (matrix[i][k] - means[i]);
        }

        s /= divisor;
        cov[i][j] = s;
        cov[j][i] = s;
      }
    }
  } else {
    throw new Error('Invalid dimension');
  }

  return cov;
};

exports.correlation = function correlation(matrix) {
  var means = exports.mean(matrix),
      standardDeviations = exports.standardDeviation(matrix, true, means),
      scores = exports.zScores(matrix, means, standardDeviations),
      rows = matrix.length,
      cols = matrix[0].length,
      i,
      j;
  var cor = new Array(cols);

  for (i = 0; i < cols; i++) {
    cor[i] = new Array(cols);
  }

  for (i = 0; i < cols; i++) {
    for (j = i; j < cols; j++) {
      var c = 0;

      for (var k = 0, l = scores.length; k < l; k++) {
        c += scores[k][j] * scores[k][i];
      }

      c /= rows - 1;
      cor[i][j] = c;
      cor[j][i] = c;
    }
  }

  return cor;
};

exports.zScores = function zScores(matrix, means, standardDeviations) {
  means = means || exports.mean(matrix);
  if (typeof standardDeviations === 'undefined') standardDeviations = exports.standardDeviation(matrix, true, means);
  return exports.standardize(exports.center(matrix, means, false), standardDeviations, true);
};

exports.center = function center(matrix, means, inPlace) {
  means = means || exports.mean(matrix);
  var result = matrix,
      l = matrix.length,
      i,
      j,
      jj;

  if (!inPlace) {
    result = new Array(l);

    for (i = 0; i < l; i++) {
      result[i] = new Array(matrix[i].length);
    }
  }

  for (i = 0; i < l; i++) {
    var row = result[i];

    for (j = 0, jj = row.length; j < jj; j++) {
      row[j] = matrix[i][j] - means[j];
    }
  }

  return result;
};

exports.standardize = function standardize(matrix, standardDeviations, inPlace) {
  if (typeof standardDeviations === 'undefined') standardDeviations = exports.standardDeviation(matrix);
  var result = matrix,
      l = matrix.length,
      i,
      j,
      jj;

  if (!inPlace) {
    result = new Array(l);

    for (i = 0; i < l; i++) {
      result[i] = new Array(matrix[i].length);
    }
  }

  for (i = 0; i < l; i++) {
    var resultRow = result[i];
    var sourceRow = matrix[i];

    for (j = 0, jj = resultRow.length; j < jj; j++) {
      if (standardDeviations[j] !== 0 && !isNaN(standardDeviations[j])) {
        resultRow[j] = sourceRow[j] / standardDeviations[j];
      }
    }
  }

  return result;
};

exports.weightedVariance = function weightedVariance(matrix, weights) {
  var means = exports.mean(matrix);
  var rows = matrix.length;
  if (rows === 0) return [];
  var cols = matrix[0].length;
  var vari = new Array(cols);

  for (var j = 0; j < cols; j++) {
    var sum = 0;
    var a = 0,
        b = 0;

    for (var i = 0; i < rows; i++) {
      var z = matrix[i][j] - means[j];
      var w = weights[i];
      sum += w * (z * z);
      b += w;
      a += w * w;
    }

    vari[j] = sum * (b / (b * b - a));
  }

  return vari;
};

exports.weightedMean = function weightedMean(matrix, weights, dimension) {
  if (typeof dimension === 'undefined') {
    dimension = 0;
  }

  var rows = matrix.length;
  if (rows === 0) return [];
  var cols = matrix[0].length,
      means,
      i,
      ii,
      j,
      w,
      row;

  if (dimension === 0) {
    means = new Array(cols);

    for (i = 0; i < cols; i++) {
      means[i] = 0;
    }

    for (i = 0; i < rows; i++) {
      row = matrix[i];
      w = weights[i];

      for (j = 0; j < cols; j++) {
        means[j] += row[j] * w;
      }
    }
  } else if (dimension === 1) {
    means = new Array(rows);

    for (i = 0; i < rows; i++) {
      means[i] = 0;
    }

    for (j = 0; j < rows; j++) {
      row = matrix[j];
      w = weights[j];

      for (i = 0; i < cols; i++) {
        means[j] += row[i] * w;
      }
    }
  } else {
    throw new Error('Invalid dimension');
  }

  var weightSum = arrayStat.sum(weights);

  if (weightSum !== 0) {
    for (i = 0, ii = means.length; i < ii; i++) {
      means[i] /= weightSum;
    }
  }

  return means;
};

exports.weightedCovariance = function weightedCovariance(matrix, weights, means, dimension) {
  dimension = dimension || 0;
  means = means || exports.weightedMean(matrix, weights, dimension);
  var s1 = 0,
      s2 = 0;

  for (var i = 0, ii = weights.length; i < ii; i++) {
    s1 += weights[i];
    s2 += weights[i] * weights[i];
  }

  var factor = s1 / (s1 * s1 - s2);
  return exports.weightedScatter(matrix, weights, means, factor, dimension);
};

exports.weightedScatter = function weightedScatter(matrix, weights, means, factor, dimension) {
  dimension = dimension || 0;
  means = means || exports.weightedMean(matrix, weights, dimension);

  if (typeof factor === 'undefined') {
    factor = 1;
  }

  var rows = matrix.length;

  if (rows === 0) {
    return [[]];
  }

  var cols = matrix[0].length,
      cov,
      i,
      j,
      k,
      s;

  if (dimension === 0) {
    cov = new Array(cols);

    for (i = 0; i < cols; i++) {
      cov[i] = new Array(cols);
    }

    for (i = 0; i < cols; i++) {
      for (j = i; j < cols; j++) {
        s = 0;

        for (k = 0; k < rows; k++) {
          s += weights[k] * (matrix[k][j] - means[j]) * (matrix[k][i] - means[i]);
        }

        cov[i][j] = s * factor;
        cov[j][i] = s * factor;
      }
    }
  } else if (dimension === 1) {
    cov = new Array(rows);

    for (i = 0; i < rows; i++) {
      cov[i] = new Array(rows);
    }

    for (i = 0; i < rows; i++) {
      for (j = i; j < rows; j++) {
        s = 0;

        for (k = 0; k < cols; k++) {
          s += weights[k] * (matrix[j][k] - means[j]) * (matrix[i][k] - means[i]);
        }

        cov[i][j] = s * factor;
        cov[j][i] = s * factor;
      }
    }
  } else {
    throw new Error('Invalid dimension');
  }

  return cov;
};

/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is_any_array__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Computes the mean of the given values
 * @param {Array<number>} input
 * @return {number}
 */

function mean(input) {
  if (!is_any_array__WEBPACK_IMPORTED_MODULE_0___default()(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  var sum = 0;

  for (var i = 0; i < input.length; i++) {
    sum += input[i];
  }

  return sum / input.length;
}

/* harmony default export */ __webpack_exports__["default"] = (mean);

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = function (haystack, needle, comparator, low, high) {
  var mid, cmp;
  if (low === undefined) low = 0;else {
    low = low | 0;
    if (low < 0 || low >= haystack.length) throw new RangeError("invalid lower bound");
  }
  if (high === undefined) high = haystack.length - 1;else {
    high = high | 0;
    if (high < low || high >= haystack.length) throw new RangeError("invalid upper bound");
  }

  while (low <= high) {
    /* Note that "(low + high) >>> 1" may overflow, and results in a typecast
     * to double (which gives the wrong results). */
    mid = low + (high - low >> 1);
    cmp = +comparator(haystack[mid], needle, mid, haystack);
    /* Too low. */

    if (cmp < 0.0) low = mid + 1;
    /* Too high. */
    else if (cmp > 0.0) high = mid - 1;
      /* Key found. */
      else return mid;
  }
  /* Key not found. */


  return ~low;
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var numberIsNan = __webpack_require__(74);

function assertNum(x) {
  if (typeof x !== 'number' || numberIsNan(x)) {
    throw new TypeError('Expected a number');
  }
}

exports.asc = function (a, b) {
  assertNum(a);
  assertNum(b);
  return a - b;
};

exports.desc = function (a, b) {
  assertNum(a);
  assertNum(b);
  return b - a;
};

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/ml-matrix/src/index.js + 24 modules
var src = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ml-array-mean/lib-es6/index.js
var lib_es6 = __webpack_require__(5);

// CONCATENATED MODULE: ./node_modules/ml-cart/src/utils.js


/**
 * @private
 * return an array of probabilities of each class
 * @param {Array} array - contains the classes
 * @param {number} numberOfClasses
 * @return {Matrix} - rowVector of probabilities.
 */

function toDiscreteDistribution(array, numberOfClasses) {
  var counts = new Array(numberOfClasses).fill(0);

  for (var i = 0; i < array.length; ++i) {
    counts[array[i]] += 1 / array.length;
  }

  return src["default"].rowVector(counts);
}
/**
 * @private
 * Retrieves the impurity of array of predictions
 * @param {Array} array - predictions.
 * @return {number} Gini impurity
 */

function giniImpurity(array) {
  if (array.length === 0) {
    return 0;
  }

  var probabilities = toDiscreteDistribution(array, getNumberOfClasses(array))[0];
  var sum = 0.0;

  for (var i = 0; i < probabilities.length; ++i) {
    sum += probabilities[i] * probabilities[i];
  }

  return 1 - sum;
}
/**
 * @private
 * Return the number of classes given the array of predictions.
 * @param {Array} array - predictions.
 * @return {number} Number of classes.
 */

function getNumberOfClasses(array) {
  return array.filter(function (val, i, arr) {
    return arr.indexOf(val) === i;
  }).length;
}
/**
 * @private
 * Calculates the Gini Gain of an array of predictions and those predictions splitted by a feature.
 * @para {Array} array - Predictions
 * @param {object} splitted - Object with elements "greater" and "lesser" that contains an array of predictions splitted.
 * @return {number} - Gini Gain.
 */

function giniGain(array, splitted) {
  var splitsImpurity = 0.0;
  var splits = ['greater', 'lesser'];

  for (var i = 0; i < splits.length; ++i) {
    var currentSplit = splitted[splits[i]];
    splitsImpurity += giniImpurity(currentSplit) * currentSplit.length / array.length;
  }

  return giniImpurity(array) - splitsImpurity;
}
/**
 * @private
 * Calculates the squared error of a predictions values.
 * @param {Array} array - predictions values
 * @return {number} squared error.
 */

function utils_squaredError(array) {
  var l = array.length;
  var m = Object(lib_es6["default"])(array);
  var squaredError = 0.0;

  for (var i = 0; i < l; ++i) {
    var currentElement = array[i];
    squaredError += (currentElement - m) * (currentElement - m);
  }

  return squaredError;
}
/**
 * @private
 * Calculates the sum of squared error of the two arrays that contains the splitted values.
 * @param {Array} array - this argument is no necessary but is used to fit with the main interface.
 * @param {object} splitted - Object with elements "greater" and "lesser" that contains an array of predictions splitted.
 * @return {number} - sum of squared errors.
 */

function regressionError(array, splitted) {
  var error = 0.0;
  var splits = ['greater', 'lesser'];

  for (var i = 0; i < splits.length; ++i) {
    var currentSplit = splitted[splits[i]];
    error += utils_squaredError(currentSplit);
  }

  return error;
}
/**
 * @private
 * Split the training set and values from a given column of the training set if is less than a value
 * @param {Matrix} X - Training set.
 * @param {Array} y - Training values.
 * @param {number} column - Column to split.
 * @param {number} value - value to split the Training set and values.
 * @return {object} - Object that contains the splitted values.
 */

function matrixSplitter(X, y, column, value) {
  var lesserX = [];
  var greaterX = [];
  var lesserY = [];
  var greaterY = [];

  for (var i = 0; i < X.rows; ++i) {
    if (X[i][column] < value) {
      lesserX.push(X[i]);
      lesserY.push(y[i]);
    } else {
      greaterX.push(X[i]);
      greaterY.push(y[i]);
    }
  }

  return {
    greaterX: greaterX,
    greaterY: greaterY,
    lesserX: lesserX,
    lesserY: lesserY
  };
}
/**
 * @private
 * Calculates the mean between two values
 * @param {number} a
 * @param {number} b
 * @return {number}
 */

function mean(a, b) {
  return (a + b) / 2;
}
/**
 * @private
 * Returns a list of tuples that contains the i-th element of each array.
 * @param {Array} a
 * @param {Array} b
 * @return {Array} list of tuples.
 */

function zip(a, b) {
  if (a.length !== b.length) {
    throw new TypeError('Error on zip: the size of a: ' + a.length + ' is different from b: ' + b.length);
  }

  var ret = new Array(a.length);

  for (var i = 0; i < a.length; ++i) {
    ret[i] = [a[i], b[i]];
  }

  return ret;
}
// CONCATENATED MODULE: ./node_modules/ml-cart/src/TreeNode.js



const gainFunctions = {
  gini: giniGain,
  regression: regressionError
};
const splitFunctions = {
  mean: mean
};
class TreeNode_TreeNode {
  /**
   * @private
   * Constructor for a tree node given the options received on the main classes (DecisionTreeClassifier, DecisionTreeRegression)
   * @param {object|TreeNode} options for loading
   * @constructor
   */
  constructor(options) {
    // options parameters
    this.kind = options.kind;
    this.gainFunction = options.gainFunction;
    this.splitFunction = options.splitFunction;
    this.minNumSamples = options.minNumSamples;
    this.maxDepth = options.maxDepth;
  }
  /**
   * @private
   * Function that retrieve the best feature to make the split.
   * @param {Matrix} XTranspose - Training set transposed
   * @param {Array} y - labels or values (depending of the decision tree)
   * @return {object} - return tree values, the best gain, column and the split value.
   */


  bestSplit(XTranspose, y) {
    // Depending in the node tree class, we set the variables to check information gain (to classify)
    // or error (for regression)
    var bestGain = this.kind === 'classifier' ? -Infinity : Infinity;
    var check = this.kind === 'classifier' ? (a, b) => a > b : (a, b) => a < b;
    var maxColumn;
    var maxValue;

    for (var i = 0; i < XTranspose.rows; ++i) {
      var currentFeature = XTranspose[i];
      var splitValues = this.featureSplit(currentFeature, y);

      for (var j = 0; j < splitValues.length; ++j) {
        var currentSplitVal = splitValues[j];
        var splitted = this.split(currentFeature, y, currentSplitVal);
        var gain = gainFunctions[this.gainFunction](y, splitted);

        if (check(gain, bestGain)) {
          maxColumn = i;
          maxValue = currentSplitVal;
          bestGain = gain;
        }
      }
    }

    return {
      maxGain: bestGain,
      maxColumn: maxColumn,
      maxValue: maxValue
    };
  }
  /**
   * @private
   * Makes the split of the training labels or values from the training set feature given a split value.
   * @param {Array} x - Training set feature
   * @param {Array} y - Training set value or label
   * @param {number} splitValue
   * @return {object}
   */


  split(x, y, splitValue) {
    var lesser = [];
    var greater = [];

    for (var i = 0; i < x.length; ++i) {
      if (x[i] < splitValue) {
        lesser.push(y[i]);
      } else {
        greater.push(y[i]);
      }
    }

    return {
      greater: greater,
      lesser: lesser
    };
  }
  /**
   * @private
   * Calculates the possible points to split over the tree given a training set feature and corresponding labels or values.
   * @param {Array} x - Training set feature
   * @param {Array} y - Training set value or label
   * @return {Array} possible split values.
   */


  featureSplit(x, y) {
    var splitValues = [];
    var arr = zip(x, y);
    arr.sort(function (a, b) {
      return a[0] - b[0];
    });

    for (var i = 1; i < arr.length; ++i) {
      if (arr[i - 1][1] !== arr[i][1]) {
        splitValues.push(splitFunctions[this.splitFunction](arr[i - 1][0], arr[i][0]));
      }
    }

    return splitValues;
  }
  /**
   * @private
   * Calculate the predictions of a leaf tree node given the training labels or values
   * @param {Array} y
   */


  calculatePrediction(y) {
    if (this.kind === 'classifier') {
      this.distribution = toDiscreteDistribution(y, getNumberOfClasses(y));

      if (this.distribution.columns === 0) {
        throw new TypeError('Error on calculate the prediction');
      }
    } else {
      this.distribution = Object(lib_es6["default"])(y);
    }
  }
  /**
   * @private
   * Train a node given the training set and labels, because it trains recursively, it also receive
   * the current depth of the node, parent gain to avoid infinite recursion and boolean value to check if
   * the training set is transposed.
   * @param {Matrix} X - Training set (could be transposed or not given transposed).
   * @param {Array} y - Training labels or values.
   * @param {number} currentDepth - Current depth of the node.
   * @param {number} parentGain - parent node gain or error.
   */


  train(X, y, currentDepth, parentGain) {
    if (X.rows <= this.minNumSamples) {
      this.calculatePrediction(y);
      return;
    }

    if (parentGain === undefined) parentGain = 0.0;
    var XTranspose = X.transpose();
    var split = this.bestSplit(XTranspose, y);
    this.splitValue = split.maxValue;
    this.splitColumn = split.maxColumn;
    this.gain = split.maxGain;
    var splittedMatrix = matrixSplitter(X, y, this.splitColumn, this.splitValue);

    if (currentDepth < this.maxDepth && this.gain > 0.01 && this.gain !== parentGain && splittedMatrix.lesserX.length > 0 && splittedMatrix.greaterX.length > 0) {
      this.left = new TreeNode_TreeNode(this);
      this.right = new TreeNode_TreeNode(this);
      var lesserX = new src["default"](splittedMatrix.lesserX);
      var greaterX = new src["default"](splittedMatrix.greaterX);
      this.left.train(lesserX, splittedMatrix.lesserY, currentDepth + 1, this.gain);
      this.right.train(greaterX, splittedMatrix.greaterY, currentDepth + 1, this.gain);
    } else {
      this.calculatePrediction(y);
    }
  }
  /**
   * @private
   * Calculates the prediction of a given element.
   * @param {Array} row
   * @return {number|Array} prediction
   *          * if a node is a classifier returns an array of probabilities of each class.
   *          * if a node is for regression returns a number with the prediction.
   */


  classify(row) {
    if (this.right && this.left) {
      if (row[this.splitColumn] < this.splitValue) {
        return this.left.classify(row);
      } else {
        return this.right.classify(row);
      }
    }

    return this.distribution;
  }
  /**
   * @private
   * Set the parameter of the current node and their children.
   * @param {object} node - parameters of the current node and the children.
   */


  setNodeParameters(node) {
    if (node.distribution !== undefined) {
      this.distribution = node.distribution.constructor === Array ? new src["default"](node.distribution) : node.distribution;
    } else {
      this.distribution = undefined;
      this.splitValue = node.splitValue;
      this.splitColumn = node.splitColumn;
      this.gain = node.gain;
      this.left = new TreeNode_TreeNode(this);
      this.right = new TreeNode_TreeNode(this);

      if (node.left !== {}) {
        this.left.setNodeParameters(node.left);
      }

      if (node.right !== {}) {
        this.right.setNodeParameters(node.right);
      }
    }
  }

}
// CONCATENATED MODULE: ./node_modules/ml-cart/src/DecisionTreeClassifier.js


const defaultOptions = {
  gainFunction: 'gini',
  splitFunction: 'mean',
  minNumSamples: 3,
  maxDepth: Infinity
};
class DecisionTreeClassifier_DecisionTreeClassifier {
  /**
   * Create new Decision Tree Classifier with CART implementation with the given options
   * @param {object} options
   * @param {string} [options.gainFunction="gini"] - gain function to get the best split, "gini" the only one supported.
   * @param {string} [options.splitFunction="mean"] - given two integers from a split feature, get the value to split, "mean" the only one supported.
   * @param {number} [options.minNumSamples=3] - minimum number of samples to create a leaf node to decide a class.
   * @param {number} [options.maxDepth=Infinity] - Max depth of the tree.
   * @param {object} model - for load purposes.
   * @constructor
   */
  constructor(options, model) {
    if (options === true) {
      this.options = model.options;
      this.root = new TreeNode_TreeNode(model.options);
      this.root.setNodeParameters(model.root);
    } else {
      this.options = Object.assign({}, defaultOptions, options);
      this.options.kind = 'classifier';
    }
  }
  /**
   * Train the decision tree with the given training set and labels.
   * @param {Matrix|MatrixTransposeView|Array} trainingSet
   * @param {Array} trainingLabels
   */


  train(trainingSet, trainingLabels) {
    this.root = new TreeNode_TreeNode(this.options);
    trainingSet = src["default"].checkMatrix(trainingSet);
    this.root.train(trainingSet, trainingLabels, 0, null);
  }
  /**
   * Predicts the output given the matrix to predict.
   * @param {Matrix|MatrixTransposeView|Array} toPredict
   * @return {Array} predictions
   */


  predict(toPredict) {
    toPredict = src["default"].checkMatrix(toPredict);
    var predictions = new Array(toPredict.rows);

    for (var i = 0; i < toPredict.rows; ++i) {
      predictions[i] = this.root.classify(toPredict.getRow(i)).maxRowIndex(0)[1];
    }

    return predictions;
  }
  /**
   * Export the current model to JSON.
   * @return {object} - Current model.
   */


  toJSON() {
    return {
      options: this.options,
      root: this.root,
      name: 'DTClassifier'
    };
  }
  /**
   * Load a Decision tree classifier with the given model.
   * @param {object} model
   * @return {DecisionTreeClassifier}
   */


  static load(model) {
    if (model.name !== 'DTClassifier') {
      throw new RangeError('Invalid model: ' + model.name);
    }

    return new DecisionTreeClassifier_DecisionTreeClassifier(true, model);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-cart/src/DecisionTreeRegression.js


const DecisionTreeRegression_defaultOptions = {
  gainFunction: 'regression',
  splitFunction: 'mean',
  minNumSamples: 3,
  maxDepth: Infinity
};
class DecisionTreeRegression_DecisionTreeRegression {
  /**
   * Create new Decision Tree Regression with CART implementation with the given options.
   * @param {object} options
   * @param {string} [options.gainFunction="regression"] - gain function to get the best split, "regression" the only one supported.
   * @param {string} [options.splitFunction="mean"] - given two integers from a split feature, get the value to split, "mean" the only one supported.
   * @param {number} [options.minNumSamples=3] - minimum number of samples to create a leaf node to decide a class.
   * @param {number} [options.maxDepth=Infinity] - Max depth of the tree.
   * @param {object} model - for load purposes.
   */
  constructor(options, model) {
    if (options === true) {
      this.options = model.options;
      this.root = new TreeNode_TreeNode(model.options);
      this.root.setNodeParameters(model.root);
    } else {
      this.options = Object.assign({}, DecisionTreeRegression_defaultOptions, options);
      this.options.kind = 'regression';
    }
  }
  /**
   * Train the decision tree with the given training set and values.
   * @param {Matrix|MatrixTransposeView|Array} trainingSet
   * @param {Array} trainingValues
   */


  train(trainingSet, trainingValues) {
    this.root = new TreeNode_TreeNode(this.options);
    if (trainingSet[0].length === undefined) trainingSet = src["default"].columnVector(trainingSet);
    trainingSet = src["default"].checkMatrix(trainingSet);
    this.root.train(trainingSet, trainingValues, 0);
  }
  /**
   * Predicts the values given the matrix to predict.
   * @param {Matrix|MatrixTransposeView|Array} toPredict
   * @return {Array} predictions
   */


  predict(toPredict) {
    if (toPredict[0] !== undefined && toPredict[0].length === undefined) toPredict = src["default"].columnVector(toPredict);
    toPredict = src["default"].checkMatrix(toPredict);
    var predictions = new Array(toPredict.rows);

    for (var i = 0; i < toPredict.rows; ++i) {
      predictions[i] = this.root.classify(toPredict.getRow(i));
    }

    return predictions;
  }
  /**
   * Export the current model to JSON.
   * @return {object} - Current model.
   */


  toJSON() {
    return {
      options: this.options,
      root: this.root,
      name: 'DTRegression'
    };
  }
  /**
   * Load a Decision tree regression with the given model.
   * @param {object} model
   * @return {DecisionTreeRegression}
   */


  static load(model) {
    if (model.name !== 'DTRegression') {
      throw new RangeError('Invalid model:' + model.name);
    }

    return new DecisionTreeRegression_DecisionTreeRegression(true, model);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-cart/src/index.js
/* concated harmony reexport DecisionTreeClassifier */__webpack_require__.d(__webpack_exports__, "DecisionTreeClassifier", function() { return DecisionTreeClassifier_DecisionTreeClassifier; });
/* concated harmony reexport DecisionTreeRegression */__webpack_require__.d(__webpack_exports__, "DecisionTreeRegression", function() { return DecisionTreeRegression_DecisionTreeRegression; });



/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is_any_array__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Computes the maximum of the given values
 * @param {Array<number>} input
 * @return {number}
 */

function max(input) {
  if (!is_any_array__WEBPACK_IMPORTED_MODULE_0___default()(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  var max = input[0];

  for (var i = 1; i < input.length; i++) {
    if (input[i] > max) max = input[i];
  }

  return max;
}

/* harmony default export */ __webpack_exports__["default"] = (max);

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Matrix = __webpack_require__(0).Matrix;

const GaussianKernel = __webpack_require__(55);

const PolynomialKernel = __webpack_require__(56);

const ANOVAKernel = __webpack_require__(57);

const CauchyKernel = __webpack_require__(58);

const ExponentialKernel = __webpack_require__(59);

const HistogramKernel = __webpack_require__(60);

const LaplacianKernel = __webpack_require__(61);

const MultiquadraticKernel = __webpack_require__(62);

const RationalKernel = __webpack_require__(63);

const SigmoidKernel = __webpack_require__(64);

const kernelType = {
  gaussian: GaussianKernel,
  rbf: GaussianKernel,
  polynomial: PolynomialKernel,
  poly: PolynomialKernel,
  anova: ANOVAKernel,
  cauchy: CauchyKernel,
  exponential: ExponentialKernel,
  histogram: HistogramKernel,
  min: HistogramKernel,
  laplacian: LaplacianKernel,
  multiquadratic: MultiquadraticKernel,
  rational: RationalKernel,
  sigmoid: SigmoidKernel,
  mlp: SigmoidKernel
};

class Kernel {
  constructor(type, options) {
    this.kernelType = type;
    if (type === 'linear') return;

    if (typeof type === 'string') {
      type = type.toLowerCase();
      var KernelConstructor = kernelType[type];

      if (KernelConstructor) {
        this.kernelFunction = new KernelConstructor(options);
      } else {
        throw new Error('unsupported kernel type: ' + type);
      }
    } else if (typeof type === 'object' && typeof type.compute === 'function') {
      this.kernelFunction = type;
    } else {
      throw new TypeError('first argument must be a valid kernel type or instance');
    }
  }

  compute(inputs, landmarks) {
    if (landmarks === undefined) {
      landmarks = inputs;
    }

    if (this.kernelType === 'linear') {
      var matrix = new Matrix(inputs);
      return matrix.mmul(new Matrix(landmarks).transposeView());
    }

    const kernelMatrix = new Matrix(inputs.length, landmarks.length);
    var i, j;

    if (inputs === landmarks) {
      // fast path, matrix is symmetric
      for (i = 0; i < inputs.length; i++) {
        for (j = i; j < inputs.length; j++) {
          kernelMatrix[i][j] = kernelMatrix[j][i] = this.kernelFunction.compute(inputs[i], inputs[j]);
        }
      }
    } else {
      for (i = 0; i < inputs.length; i++) {
        for (j = 0; j < landmarks.length; j++) {
          kernelMatrix[i][j] = this.kernelFunction.compute(inputs[i], landmarks[j]);
        }
      }
    }

    return kernelMatrix;
  }

}

module.exports = Kernel;

/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/ml-xsadd/lib-es6/xsadd.js
var lib_es6_xsadd = __webpack_require__(19);

// CONCATENATED MODULE: ./node_modules/ml-random/lib-es6/choice.js
const PROB_TOLERANCE = 0.00000001;

function randomChoice(values) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let random = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : Math.random;
  const {
    size = 1,
    replace = false,
    probabilities
  } = options;
  let valuesArr;
  let cumSum;

  if (typeof values === 'number') {
    valuesArr = getArray(values);
  } else {
    valuesArr = values.slice();
  }

  if (probabilities) {
    if (!replace) {
      throw new Error('choice with probabilities and no replacement is not implemented');
    } // check input is sane


    if (probabilities.length !== valuesArr.length) {
      throw new Error('the length of probabilities option should be equal to the number of choices');
    }

    cumSum = [probabilities[0]];

    for (let i = 1; i < probabilities.length; i++) {
      cumSum[i] = cumSum[i - 1] + probabilities[i];
    }

    if (Math.abs(1 - cumSum[cumSum.length - 1]) > PROB_TOLERANCE) {
      throw new Error("probabilities should sum to 1, but instead sums to ".concat(cumSum[cumSum.length - 1]));
    }
  }

  if (replace === false && size > valuesArr.length) {
    throw new Error('size option is too large');
  }

  const result = [];

  for (let i = 0; i < size; i++) {
    const index = randomIndex(valuesArr.length, random, cumSum);
    result.push(valuesArr[index]);

    if (!replace) {
      valuesArr.splice(index, 1);
    }
  }

  return result;
}

function getArray(n) {
  const arr = [];

  for (let i = 0; i < n; i++) {
    arr.push(i);
  }

  return arr;
}

function randomIndex(n, random, cumSum) {
  const rand = random();

  if (!cumSum) {
    return Math.floor(rand * n);
  } else {
    let idx = 0;

    while (rand > cumSum[idx]) {
      idx++;
    }

    return idx;
  }
}

/* harmony default export */ var choice = (randomChoice);
// CONCATENATED MODULE: ./node_modules/ml-random/lib-es6/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return lib_es6_Random; });
// tslint:disable-next-line


/**
 * @classdesc Random class
 */

class lib_es6_Random {
  /**
   * @param [seedOrRandom=Math.random] - Control the random number generator used by the Random class instance. Pass a random number generator function with a uniform distribution over the half-open interval [0, 1[. If seed will pass it to ml-xsadd to create a seeded random number generator. If undefined will use Math.random.
   */
  constructor() {
    let seedOrRandom = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Math.random;

    if (typeof seedOrRandom === 'number') {
      const xsadd = new lib_es6_xsadd["default"](seedOrRandom);
      this.randomGenerator = xsadd.random;
    } else {
      this.randomGenerator = seedOrRandom;
    }
  }

  choice(values, options) {
    if (typeof values === 'number') {
      return choice(values, options, this.randomGenerator);
    }

    return choice(values, options, this.randomGenerator);
  }
  /**
   * Draw a random number from a uniform distribution on [0,1)
   * @return The random number
   */


  random() {
    return this.randomGenerator();
  }
  /**
   * Draw a random integer from a uniform distribution on [low, high). If only low is specified, the number is drawn on [0, low)
   * @param low - The lower bound of the uniform distribution interval.
   * @param high - The higher bound of the uniform distribution interval.
   */


  randInt(low, high) {
    if (high === undefined) {
      high = low;
      low = 0;
    }

    return low + Math.floor(this.randomGenerator() * (high - low));
  }
  /**
   * Draw several random number from a uniform distribution on [0, 1)
   * @param size - The number of number to draw
   * @return - The list of drawn numbers.
   */


  randomSample(size) {
    const result = [];

    for (let i = 0; i < size; i++) {
      result.push(this.random());
    }

    return result;
  }

}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*jshint eqnull:true*/
(function (root) {
  "use strict";

  var GLOBAL_KEY = "Random";
  var imul = typeof Math.imul !== "function" || Math.imul(0xffffffff, 5) !== -5 ? function (a, b) {
    var ah = a >>> 16 & 0xffff;
    var al = a & 0xffff;
    var bh = b >>> 16 & 0xffff;
    var bl = b & 0xffff; // the shift by 0 fixes the sign on the high part
    // the final |0 converts the unsigned value into a signed value

    return al * bl + (ah * bl + al * bh << 16 >>> 0) | 0;
  } : Math.imul;
  var stringRepeat = typeof String.prototype.repeat === "function" && "x".repeat(3) === "xxx" ? function (x, y) {
    return x.repeat(y);
  } : function (pattern, count) {
    var result = "";

    while (count > 0) {
      if (count & 1) {
        result += pattern;
      }

      count >>= 1;
      pattern += pattern;
    }

    return result;
  };

  function Random(engine) {
    if (!(this instanceof Random)) {
      return new Random(engine);
    }

    if (engine == null) {
      engine = Random.engines.nativeMath;
    } else if (typeof engine !== "function") {
      throw new TypeError("Expected engine to be a function, got " + typeof engine);
    }

    this.engine = engine;
  }

  var proto = Random.prototype;
  Random.engines = {
    nativeMath: function nativeMath() {
      return Math.random() * 0x100000000 | 0;
    },
    mt19937: function (Int32Array) {
      // http://en.wikipedia.org/wiki/Mersenne_twister
      function refreshData(data) {
        var k = 0;
        var tmp = 0;

        for (; (k | 0) < 227; k = k + 1 | 0) {
          tmp = data[k] & 0x80000000 | data[k + 1 | 0] & 0x7fffffff;
          data[k] = data[k + 397 | 0] ^ tmp >>> 1 ^ (tmp & 0x1 ? 0x9908b0df : 0);
        }

        for (; (k | 0) < 623; k = k + 1 | 0) {
          tmp = data[k] & 0x80000000 | data[k + 1 | 0] & 0x7fffffff;
          data[k] = data[k - 227 | 0] ^ tmp >>> 1 ^ (tmp & 0x1 ? 0x9908b0df : 0);
        }

        tmp = data[623] & 0x80000000 | data[0] & 0x7fffffff;
        data[623] = data[396] ^ tmp >>> 1 ^ (tmp & 0x1 ? 0x9908b0df : 0);
      }

      function temper(value) {
        value ^= value >>> 11;
        value ^= value << 7 & 0x9d2c5680;
        value ^= value << 15 & 0xefc60000;
        return value ^ value >>> 18;
      }

      function seedWithArray(data, source) {
        var i = 1;
        var j = 0;
        var sourceLength = source.length;
        var k = Math.max(sourceLength, 624) | 0;
        var previous = data[0] | 0;

        for (; (k | 0) > 0; --k) {
          data[i] = previous = (data[i] ^ imul(previous ^ previous >>> 30, 0x0019660d)) + (source[j] | 0) + (j | 0) | 0;
          i = i + 1 | 0;
          ++j;

          if ((i | 0) > 623) {
            data[0] = data[623];
            i = 1;
          }

          if (j >= sourceLength) {
            j = 0;
          }
        }

        for (k = 623; (k | 0) > 0; --k) {
          data[i] = previous = (data[i] ^ imul(previous ^ previous >>> 30, 0x5d588b65)) - i | 0;
          i = i + 1 | 0;

          if ((i | 0) > 623) {
            data[0] = data[623];
            i = 1;
          }
        }

        data[0] = 0x80000000;
      }

      function mt19937() {
        var data = new Int32Array(624);
        var index = 0;
        var uses = 0;

        function next() {
          if ((index | 0) >= 624) {
            refreshData(data);
            index = 0;
          }

          var value = data[index];
          index = index + 1 | 0;
          uses += 1;
          return temper(value) | 0;
        }

        next.getUseCount = function () {
          return uses;
        };

        next.discard = function (count) {
          uses += count;

          if ((index | 0) >= 624) {
            refreshData(data);
            index = 0;
          }

          while (count - index > 624) {
            count -= 624 - index;
            refreshData(data);
            index = 0;
          }

          index = index + count | 0;
          return next;
        };

        next.seed = function (initial) {
          var previous = 0;
          data[0] = previous = initial | 0;

          for (var i = 1; i < 624; i = i + 1 | 0) {
            data[i] = previous = imul(previous ^ previous >>> 30, 0x6c078965) + i | 0;
          }

          index = 624;
          uses = 0;
          return next;
        };

        next.seedWithArray = function (source) {
          next.seed(0x012bd6aa);
          seedWithArray(data, source);
          return next;
        };

        next.autoSeed = function () {
          return next.seedWithArray(Random.generateEntropyArray());
        };

        return next;
      }

      return mt19937;
    }(typeof Int32Array === "function" ? Int32Array : Array),
    browserCrypto: typeof crypto !== "undefined" && typeof crypto.getRandomValues === "function" && typeof Int32Array === "function" ? function () {
      var data = null;
      var index = 128;
      return function () {
        if (index >= 128) {
          if (data === null) {
            data = new Int32Array(128);
          }

          crypto.getRandomValues(data);
          index = 0;
        }

        return data[index++] | 0;
      };
    }() : null
  };

  Random.generateEntropyArray = function () {
    var array = [];
    var engine = Random.engines.nativeMath;

    for (var i = 0; i < 16; ++i) {
      array[i] = engine() | 0;
    }

    array.push(new Date().getTime() | 0);
    return array;
  };

  function returnValue(value) {
    return function () {
      return value;
    };
  } // [-0x80000000, 0x7fffffff]


  Random.int32 = function (engine) {
    return engine() | 0;
  };

  proto.int32 = function () {
    return Random.int32(this.engine);
  }; // [0, 0xffffffff]


  Random.uint32 = function (engine) {
    return engine() >>> 0;
  };

  proto.uint32 = function () {
    return Random.uint32(this.engine);
  }; // [0, 0x1fffffffffffff]


  Random.uint53 = function (engine) {
    var high = engine() & 0x1fffff;
    var low = engine() >>> 0;
    return high * 0x100000000 + low;
  };

  proto.uint53 = function () {
    return Random.uint53(this.engine);
  }; // [0, 0x20000000000000]


  Random.uint53Full = function (engine) {
    while (true) {
      var high = engine() | 0;

      if (high & 0x200000) {
        if ((high & 0x3fffff) === 0x200000 && (engine() | 0) === 0) {
          return 0x20000000000000;
        }
      } else {
        var low = engine() >>> 0;
        return (high & 0x1fffff) * 0x100000000 + low;
      }
    }
  };

  proto.uint53Full = function () {
    return Random.uint53Full(this.engine);
  }; // [-0x20000000000000, 0x1fffffffffffff]


  Random.int53 = function (engine) {
    var high = engine() | 0;
    var low = engine() >>> 0;
    return (high & 0x1fffff) * 0x100000000 + low + (high & 0x200000 ? -0x20000000000000 : 0);
  };

  proto.int53 = function () {
    return Random.int53(this.engine);
  }; // [-0x20000000000000, 0x20000000000000]


  Random.int53Full = function (engine) {
    while (true) {
      var high = engine() | 0;

      if (high & 0x400000) {
        if ((high & 0x7fffff) === 0x400000 && (engine() | 0) === 0) {
          return 0x20000000000000;
        }
      } else {
        var low = engine() >>> 0;
        return (high & 0x1fffff) * 0x100000000 + low + (high & 0x200000 ? -0x20000000000000 : 0);
      }
    }
  };

  proto.int53Full = function () {
    return Random.int53Full(this.engine);
  };

  function add(generate, addend) {
    if (addend === 0) {
      return generate;
    } else {
      return function (engine) {
        return generate(engine) + addend;
      };
    }
  }

  Random.integer = function () {
    function isPowerOfTwoMinusOne(value) {
      return (value + 1 & value) === 0;
    }

    function bitmask(masking) {
      return function (engine) {
        return engine() & masking;
      };
    }

    function downscaleToLoopCheckedRange(range) {
      var extendedRange = range + 1;
      var maximum = extendedRange * Math.floor(0x100000000 / extendedRange);
      return function (engine) {
        var value = 0;

        do {
          value = engine() >>> 0;
        } while (value >= maximum);

        return value % extendedRange;
      };
    }

    function downscaleToRange(range) {
      if (isPowerOfTwoMinusOne(range)) {
        return bitmask(range);
      } else {
        return downscaleToLoopCheckedRange(range);
      }
    }

    function isEvenlyDivisibleByMaxInt32(value) {
      return (value | 0) === 0;
    }

    function upscaleWithHighMasking(masking) {
      return function (engine) {
        var high = engine() & masking;
        var low = engine() >>> 0;
        return high * 0x100000000 + low;
      };
    }

    function upscaleToLoopCheckedRange(extendedRange) {
      var maximum = extendedRange * Math.floor(0x20000000000000 / extendedRange);
      return function (engine) {
        var ret = 0;

        do {
          var high = engine() & 0x1fffff;
          var low = engine() >>> 0;
          ret = high * 0x100000000 + low;
        } while (ret >= maximum);

        return ret % extendedRange;
      };
    }

    function upscaleWithinU53(range) {
      var extendedRange = range + 1;

      if (isEvenlyDivisibleByMaxInt32(extendedRange)) {
        var highRange = (extendedRange / 0x100000000 | 0) - 1;

        if (isPowerOfTwoMinusOne(highRange)) {
          return upscaleWithHighMasking(highRange);
        }
      }

      return upscaleToLoopCheckedRange(extendedRange);
    }

    function upscaleWithinI53AndLoopCheck(min, max) {
      return function (engine) {
        var ret = 0;

        do {
          var high = engine() | 0;
          var low = engine() >>> 0;
          ret = (high & 0x1fffff) * 0x100000000 + low + (high & 0x200000 ? -0x20000000000000 : 0);
        } while (ret < min || ret > max);

        return ret;
      };
    }

    return function (min, max) {
      min = Math.floor(min);
      max = Math.floor(max);

      if (min < -0x20000000000000 || !isFinite(min)) {
        throw new RangeError("Expected min to be at least " + -0x20000000000000);
      } else if (max > 0x20000000000000 || !isFinite(max)) {
        throw new RangeError("Expected max to be at most " + 0x20000000000000);
      }

      var range = max - min;

      if (range <= 0 || !isFinite(range)) {
        return returnValue(min);
      } else if (range === 0xffffffff) {
        if (min === 0) {
          return Random.uint32;
        } else {
          return add(Random.int32, min + 0x80000000);
        }
      } else if (range < 0xffffffff) {
        return add(downscaleToRange(range), min);
      } else if (range === 0x1fffffffffffff) {
        return add(Random.uint53, min);
      } else if (range < 0x1fffffffffffff) {
        return add(upscaleWithinU53(range), min);
      } else if (max - 1 - min === 0x1fffffffffffff) {
        return add(Random.uint53Full, min);
      } else if (min === -0x20000000000000 && max === 0x20000000000000) {
        return Random.int53Full;
      } else if (min === -0x20000000000000 && max === 0x1fffffffffffff) {
        return Random.int53;
      } else if (min === -0x1fffffffffffff && max === 0x20000000000000) {
        return add(Random.int53, 1);
      } else if (max === 0x20000000000000) {
        return add(upscaleWithinI53AndLoopCheck(min - 1, max - 1), 1);
      } else {
        return upscaleWithinI53AndLoopCheck(min, max);
      }
    };
  }();

  proto.integer = function (min, max) {
    return Random.integer(min, max)(this.engine);
  }; // [0, 1] (floating point)


  Random.realZeroToOneInclusive = function (engine) {
    return Random.uint53Full(engine) / 0x20000000000000;
  };

  proto.realZeroToOneInclusive = function () {
    return Random.realZeroToOneInclusive(this.engine);
  }; // [0, 1) (floating point)


  Random.realZeroToOneExclusive = function (engine) {
    return Random.uint53(engine) / 0x20000000000000;
  };

  proto.realZeroToOneExclusive = function () {
    return Random.realZeroToOneExclusive(this.engine);
  };

  Random.real = function () {
    function multiply(generate, multiplier) {
      if (multiplier === 1) {
        return generate;
      } else if (multiplier === 0) {
        return function () {
          return 0;
        };
      } else {
        return function (engine) {
          return generate(engine) * multiplier;
        };
      }
    }

    return function (left, right, inclusive) {
      if (!isFinite(left)) {
        throw new RangeError("Expected left to be a finite number");
      } else if (!isFinite(right)) {
        throw new RangeError("Expected right to be a finite number");
      }

      return add(multiply(inclusive ? Random.realZeroToOneInclusive : Random.realZeroToOneExclusive, right - left), left);
    };
  }();

  proto.real = function (min, max, inclusive) {
    return Random.real(min, max, inclusive)(this.engine);
  };

  Random.bool = function () {
    function isLeastBitTrue(engine) {
      return (engine() & 1) === 1;
    }

    function lessThan(generate, value) {
      return function (engine) {
        return generate(engine) < value;
      };
    }

    function probability(percentage) {
      if (percentage <= 0) {
        return returnValue(false);
      } else if (percentage >= 1) {
        return returnValue(true);
      } else {
        var scaled = percentage * 0x100000000;

        if (scaled % 1 === 0) {
          return lessThan(Random.int32, scaled - 0x80000000 | 0);
        } else {
          return lessThan(Random.uint53, Math.round(percentage * 0x20000000000000));
        }
      }
    }

    return function (numerator, denominator) {
      if (denominator == null) {
        if (numerator == null) {
          return isLeastBitTrue;
        }

        return probability(numerator);
      } else {
        if (numerator <= 0) {
          return returnValue(false);
        } else if (numerator >= denominator) {
          return returnValue(true);
        }

        return lessThan(Random.integer(0, denominator - 1), numerator);
      }
    };
  }();

  proto.bool = function (numerator, denominator) {
    return Random.bool(numerator, denominator)(this.engine);
  };

  function toInteger(value) {
    var number = +value;

    if (number < 0) {
      return Math.ceil(number);
    } else {
      return Math.floor(number);
    }
  }

  function convertSliceArgument(value, length) {
    if (value < 0) {
      return Math.max(value + length, 0);
    } else {
      return Math.min(value, length);
    }
  }

  Random.pick = function (engine, array, begin, end) {
    var length = array.length;
    var start = begin == null ? 0 : convertSliceArgument(toInteger(begin), length);
    var finish = end === void 0 ? length : convertSliceArgument(toInteger(end), length);

    if (start >= finish) {
      return void 0;
    }

    var distribution = Random.integer(start, finish - 1);
    return array[distribution(engine)];
  };

  proto.pick = function (array, begin, end) {
    return Random.pick(this.engine, array, begin, end);
  };

  function returnUndefined() {
    return void 0;
  }

  var slice = Array.prototype.slice;

  Random.picker = function (array, begin, end) {
    var clone = slice.call(array, begin, end);

    if (!clone.length) {
      return returnUndefined;
    }

    var distribution = Random.integer(0, clone.length - 1);
    return function (engine) {
      return clone[distribution(engine)];
    };
  };

  Random.shuffle = function (engine, array, downTo) {
    var length = array.length;

    if (length) {
      if (downTo == null) {
        downTo = 0;
      }

      for (var i = length - 1 >>> 0; i > downTo; --i) {
        var distribution = Random.integer(0, i);
        var j = distribution(engine);

        if (i !== j) {
          var tmp = array[i];
          array[i] = array[j];
          array[j] = tmp;
        }
      }
    }

    return array;
  };

  proto.shuffle = function (array) {
    return Random.shuffle(this.engine, array);
  };

  Random.sample = function (engine, population, sampleSize) {
    if (sampleSize < 0 || sampleSize > population.length || !isFinite(sampleSize)) {
      throw new RangeError("Expected sampleSize to be within 0 and the length of the population");
    }

    if (sampleSize === 0) {
      return [];
    }

    var clone = slice.call(population);
    var length = clone.length;

    if (length === sampleSize) {
      return Random.shuffle(engine, clone, 0);
    }

    var tailLength = length - sampleSize;
    return Random.shuffle(engine, clone, tailLength - 1).slice(tailLength);
  };

  proto.sample = function (population, sampleSize) {
    return Random.sample(this.engine, population, sampleSize);
  };

  Random.die = function (sideCount) {
    return Random.integer(1, sideCount);
  };

  proto.die = function (sideCount) {
    return Random.die(sideCount)(this.engine);
  };

  Random.dice = function (sideCount, dieCount) {
    var distribution = Random.die(sideCount);
    return function (engine) {
      var result = [];
      result.length = dieCount;

      for (var i = 0; i < dieCount; ++i) {
        result[i] = distribution(engine);
      }

      return result;
    };
  };

  proto.dice = function (sideCount, dieCount) {
    return Random.dice(sideCount, dieCount)(this.engine);
  }; // http://en.wikipedia.org/wiki/Universally_unique_identifier


  Random.uuid4 = function () {
    function zeroPad(string, zeroCount) {
      return stringRepeat("0", zeroCount - string.length) + string;
    }

    return function (engine) {
      var a = engine() >>> 0;
      var b = engine() | 0;
      var c = engine() | 0;
      var d = engine() >>> 0;
      return zeroPad(a.toString(16), 8) + "-" + zeroPad((b & 0xffff).toString(16), 4) + "-" + zeroPad((b >> 4 & 0x0fff | 0x4000).toString(16), 4) + "-" + zeroPad((c & 0x3fff | 0x8000).toString(16), 4) + "-" + zeroPad((c >> 4 & 0xffff).toString(16), 4) + zeroPad(d.toString(16), 8);
    };
  }();

  proto.uuid4 = function () {
    return Random.uuid4(this.engine);
  };

  Random.string = function () {
    // has 2**x chars, for faster uniform distribution
    var DEFAULT_STRING_POOL = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789_-";
    return function (pool) {
      if (pool == null) {
        pool = DEFAULT_STRING_POOL;
      }

      var length = pool.length;

      if (!length) {
        throw new Error("Expected pool not to be an empty string");
      }

      var distribution = Random.integer(0, length - 1);
      return function (engine, length) {
        var result = "";

        for (var i = 0; i < length; ++i) {
          var j = distribution(engine);
          result += pool.charAt(j);
        }

        return result;
      };
    };
  }();

  proto.string = function (length, pool) {
    return Random.string(pool)(this.engine, length);
  };

  Random.hex = function () {
    var LOWER_HEX_POOL = "0123456789abcdef";
    var lowerHex = Random.string(LOWER_HEX_POOL);
    var upperHex = Random.string(LOWER_HEX_POOL.toUpperCase());
    return function (upper) {
      if (upper) {
        return upperHex;
      } else {
        return lowerHex;
      }
    };
  }();

  proto.hex = function (length, upper) {
    return Random.hex(upper)(this.engine, length);
  };

  Random.date = function (start, end) {
    if (!(start instanceof Date)) {
      throw new TypeError("Expected start to be a Date, got " + typeof start);
    } else if (!(end instanceof Date)) {
      throw new TypeError("Expected end to be a Date, got " + typeof end);
    }

    var distribution = Random.integer(start.getTime(), end.getTime());
    return function (engine) {
      return new Date(distribution(engine));
    };
  };

  proto.date = function (start, end) {
    return Random.date(start, end)(this.engine);
  };

  if (true) {
    !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () {
      return Random;
    }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
})(this);

/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ml_array_max__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(9);
/* harmony import */ var ml_array_min__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(17);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(1);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(is_any_array__WEBPACK_IMPORTED_MODULE_2__);




function rescale(input) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!is_any_array__WEBPACK_IMPORTED_MODULE_2___default()(input)) {
    throw new TypeError('input must be an array');
  } else if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  var output;

  if (options.output !== undefined) {
    if (!is_any_array__WEBPACK_IMPORTED_MODULE_2___default()(options.output)) {
      throw new TypeError('output option must be an array if specified');
    }

    output = options.output;
  } else {
    output = new Array(input.length);
  }

  var currentMin = Object(ml_array_min__WEBPACK_IMPORTED_MODULE_1__["default"])(input);
  var currentMax = Object(ml_array_max__WEBPACK_IMPORTED_MODULE_0__["default"])(input);

  if (currentMin === currentMax) {
    throw new RangeError('minimum and maximum input values are equal. Cannot rescale a constant array');
  }

  var _options$min = options.min,
      minValue = _options$min === void 0 ? options.autoMinMax ? currentMin : 0 : _options$min,
      _options$max = options.max,
      maxValue = _options$max === void 0 ? options.autoMinMax ? currentMax : 1 : _options$max;

  if (minValue >= maxValue) {
    throw new RangeError('min option must be smaller than max option');
  }

  var factor = (maxValue - minValue) / (currentMax - currentMin);

  for (var i = 0; i < input.length; i++) {
    output[i] = (input[i] - currentMin) * factor + minValue;
  }

  return output;
}

/* harmony default export */ __webpack_exports__["default"] = (rescale);

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const newArray = __webpack_require__(72);

const primeFinder = __webpack_require__(73);

const nextPrime = primeFinder.nextPrime;
const largestPrime = primeFinder.largestPrime;
const FREE = 0;
const FULL = 1;
const REMOVED = 2;
const defaultInitialCapacity = 150;
const defaultMinLoadFactor = 1 / 6;
const defaultMaxLoadFactor = 2 / 3;

class HashTable {
  constructor() {
    let options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (options instanceof HashTable) {
      this.table = options.table.slice();
      this.values = options.values.slice();
      this.state = options.state.slice();
      this.minLoadFactor = options.minLoadFactor;
      this.maxLoadFactor = options.maxLoadFactor;
      this.distinct = options.distinct;
      this.freeEntries = options.freeEntries;
      this.lowWaterMark = options.lowWaterMark;
      this.highWaterMark = options.maxLoadFactor;
      return;
    }

    const initialCapacity = options.initialCapacity === undefined ? defaultInitialCapacity : options.initialCapacity;

    if (initialCapacity < 0) {
      throw new RangeError("initial capacity must not be less than zero: ".concat(initialCapacity));
    }

    const minLoadFactor = options.minLoadFactor === undefined ? defaultMinLoadFactor : options.minLoadFactor;
    const maxLoadFactor = options.maxLoadFactor === undefined ? defaultMaxLoadFactor : options.maxLoadFactor;

    if (minLoadFactor < 0 || minLoadFactor >= 1) {
      throw new RangeError("invalid minLoadFactor: ".concat(minLoadFactor));
    }

    if (maxLoadFactor <= 0 || maxLoadFactor >= 1) {
      throw new RangeError("invalid maxLoadFactor: ".concat(maxLoadFactor));
    }

    if (minLoadFactor >= maxLoadFactor) {
      throw new RangeError("minLoadFactor (".concat(minLoadFactor, ") must be smaller than maxLoadFactor (").concat(maxLoadFactor, ")"));
    }

    let capacity = initialCapacity; // User wants to put at least capacity elements. We need to choose the size based on the maxLoadFactor to
    // avoid the need to rehash before this capacity is reached.
    // actualCapacity * maxLoadFactor >= capacity

    capacity = capacity / maxLoadFactor | 0;
    capacity = nextPrime(capacity);
    if (capacity === 0) capacity = 1;
    this.table = newArray(capacity, 0);
    this.values = newArray(capacity, 0);
    this.state = newArray(capacity, 0);
    this.minLoadFactor = minLoadFactor;

    if (capacity === largestPrime) {
      this.maxLoadFactor = 1;
    } else {
      this.maxLoadFactor = maxLoadFactor;
    }

    this.distinct = 0;
    this.freeEntries = capacity;
    this.lowWaterMark = 0;
    this.highWaterMark = chooseHighWaterMark(capacity, this.maxLoadFactor);
  }

  clone() {
    return new HashTable(this);
  }

  get size() {
    return this.distinct;
  }

  get(key) {
    const i = this.indexOfKey(key);
    if (i < 0) return 0;
    return this.values[i];
  }

  set(key, value) {
    let i = this.indexOfInsertion(key);

    if (i < 0) {
      i = -i - 1;
      this.values[i] = value;
      return false;
    }

    if (this.distinct > this.highWaterMark) {
      const newCapacity = chooseGrowCapacity(this.distinct + 1, this.minLoadFactor, this.maxLoadFactor);
      this.rehash(newCapacity);
      return this.set(key, value);
    }

    this.table[i] = key;
    this.values[i] = value;
    if (this.state[i] === FREE) this.freeEntries--;
    this.state[i] = FULL;
    this.distinct++;

    if (this.freeEntries < 1) {
      const newCapacity = chooseGrowCapacity(this.distinct + 1, this.minLoadFactor, this.maxLoadFactor);
      this.rehash(newCapacity);
    }

    return true;
  }

  remove(key, noRehash) {
    const i = this.indexOfKey(key);
    if (i < 0) return false;
    this.state[i] = REMOVED;
    this.distinct--;
    if (!noRehash) this.maybeShrinkCapacity();
    return true;
  }

  delete(key, noRehash) {
    const i = this.indexOfKey(key);
    if (i < 0) return false;
    this.state[i] = FREE;
    this.distinct--;
    if (!noRehash) this.maybeShrinkCapacity();
    return true;
  }

  maybeShrinkCapacity() {
    if (this.distinct < this.lowWaterMark) {
      const newCapacity = chooseShrinkCapacity(this.distinct, this.minLoadFactor, this.maxLoadFactor);
      this.rehash(newCapacity);
    }
  }

  containsKey(key) {
    return this.indexOfKey(key) >= 0;
  }

  indexOfKey(key) {
    const table = this.table;
    const state = this.state;
    const length = this.table.length;
    const hash = key & 0x7fffffff;
    let i = hash % length;
    let decrement = hash % (length - 2);
    if (decrement === 0) decrement = 1;

    while (state[i] !== FREE && (state[i] === REMOVED || table[i] !== key)) {
      i -= decrement;
      if (i < 0) i += length;
    }

    if (state[i] === FREE) return -1;
    return i;
  }

  containsValue(value) {
    return this.indexOfValue(value) >= 0;
  }

  indexOfValue(value) {
    const values = this.values;
    const state = this.state;

    for (var i = 0; i < state.length; i++) {
      if (state[i] === FULL && values[i] === value) {
        return i;
      }
    }

    return -1;
  }

  indexOfInsertion(key) {
    const table = this.table;
    const state = this.state;
    const length = table.length;
    const hash = key & 0x7fffffff;
    let i = hash % length;
    let decrement = hash % (length - 2);
    if (decrement === 0) decrement = 1;

    while (state[i] === FULL && table[i] !== key) {
      i -= decrement;
      if (i < 0) i += length;
    }

    if (state[i] === REMOVED) {
      const j = i;

      while (state[i] !== FREE && (state[i] === REMOVED || table[i] !== key)) {
        i -= decrement;
        if (i < 0) i += length;
      }

      if (state[i] === FREE) i = j;
    }

    if (state[i] === FULL) {
      return -i - 1;
    }

    return i;
  }

  ensureCapacity(minCapacity) {
    if (this.table.length < minCapacity) {
      const newCapacity = nextPrime(minCapacity);
      this.rehash(newCapacity);
    }
  }

  rehash(newCapacity) {
    const oldCapacity = this.table.length;
    if (newCapacity <= this.distinct) throw new Error('Unexpected');
    const oldTable = this.table;
    const oldValues = this.values;
    const oldState = this.state;
    const newTable = newArray(newCapacity, 0);
    const newValues = newArray(newCapacity, 0);
    const newState = newArray(newCapacity, 0);
    this.lowWaterMark = chooseLowWaterMark(newCapacity, this.minLoadFactor);
    this.highWaterMark = chooseHighWaterMark(newCapacity, this.maxLoadFactor);
    this.table = newTable;
    this.values = newValues;
    this.state = newState;
    this.freeEntries = newCapacity - this.distinct;

    for (var i = 0; i < oldCapacity; i++) {
      if (oldState[i] === FULL) {
        var element = oldTable[i];
        var index = this.indexOfInsertion(element);
        newTable[index] = element;
        newValues[index] = oldValues[i];
        newState[index] = FULL;
      }
    }
  }

  forEachKey(callback) {
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i] === FULL) {
        if (!callback(this.table[i])) return false;
      }
    }

    return true;
  }

  forEachValue(callback) {
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i] === FULL) {
        if (!callback(this.values[i])) return false;
      }
    }

    return true;
  }

  forEachPair(callback) {
    for (var i = 0; i < this.state.length; i++) {
      if (this.state[i] === FULL) {
        if (!callback(this.table[i], this.values[i])) return false;
      }
    }

    return true;
  }

}

module.exports = HashTable;

function chooseLowWaterMark(capacity, minLoad) {
  return capacity * minLoad | 0;
}

function chooseHighWaterMark(capacity, maxLoad) {
  return Math.min(capacity - 2, capacity * maxLoad | 0);
}

function chooseGrowCapacity(size, minLoad, maxLoad) {
  return nextPrime(Math.max(size + 1, 4 * size / (3 * minLoad + maxLoad) | 0));
}

function chooseShrinkCapacity(size, minLoad, maxLoad) {
  return nextPrime(Math.max(size + 1, 4 * size / (minLoad + 3 * maxLoad) | 0));
}

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Heap = __webpack_require__(47);

function Cluster() {
  this.children = [];
  this.distance = -1;
  this.index = [];
}
/**
 * Creates an array of values where maximum distance smaller than the threshold
 * @param {number} threshold
 * @return {Array <Cluster>}
 */


Cluster.prototype.cut = function (threshold) {
  if (threshold < 0) throw new RangeError('Threshold too small');
  var root = new Cluster();
  root.children = this.children;
  root.distance = this.distance;
  root.index = this.index;
  var list = [root];
  var ans = [];

  while (list.length > 0) {
    var aux = list.shift();

    if (threshold >= aux.distance) {
      ans.push(aux);
    } else {
      list = list.concat(aux.children);
    }
  }

  return ans;
};
/**
 * Merge the leaves in the minimum way to have 'minGroups' number of clusters
 * @param {number} minGroups - Them minimum number of children the first level of the tree should have
 * @return {Cluster}
 */


Cluster.prototype.group = function (minGroups) {
  if (!Number.isInteger(minGroups) || minGroups < 1) throw new RangeError('Number of groups must be a positive integer');
  const heap = new Heap(function (a, b) {
    return b.distance - a.distance;
  });
  heap.push(this);

  while (heap.size() < minGroups) {
    var first = heap.pop();

    if (first.children.length === 0) {
      break;
    }

    first.children.forEach(child => heap.push(child));
  }

  var root = new Cluster();
  root.children = heap.toArray();
  root.distance = this.distance;
  return root;
};
/**
 * Traverses the tree depth-first and provide callback to be called on each individual node
 * @param {function} cb - The callback to be called on each node encounter
 * @type {Cluster}
 */


Cluster.prototype.traverse = function (cb) {
  function visit(root, callback) {
    callback(root);

    if (root.children) {
      for (var i = root.children.length - 1; i >= 0; i--) {
        visit(root.children[i], callback);
      }
    }
  }

  visit(this, cb);
};

module.exports = Cluster;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var hasOwn = Object.prototype.hasOwnProperty;
var toStr = Object.prototype.toString;
var defineProperty = Object.defineProperty;
var gOPD = Object.getOwnPropertyDescriptor;

var isArray = function isArray(arr) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(arr);
  }

  return toStr.call(arr) === '[object Array]';
};

var isPlainObject = function isPlainObject(obj) {
  if (!obj || toStr.call(obj) !== '[object Object]') {
    return false;
  }

  var hasOwnConstructor = hasOwn.call(obj, 'constructor');
  var hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf'); // Not own constructor property must be Object

  if (obj.constructor && !hasOwnConstructor && !hasIsPrototypeOf) {
    return false;
  } // Own properties are enumerated firstly, so to speed up,
  // if last one is own, then all properties are own.


  var key;

  for (key in obj) {
    /**/
  }

  return typeof key === 'undefined' || hasOwn.call(obj, key);
}; // If name is '__proto__', and Object.defineProperty is available, define __proto__ as an own property on target


var setProperty = function setProperty(target, options) {
  if (defineProperty && options.name === '__proto__') {
    defineProperty(target, options.name, {
      enumerable: true,
      configurable: true,
      value: options.newValue,
      writable: true
    });
  } else {
    target[options.name] = options.newValue;
  }
}; // Return undefined instead of __proto__ if '__proto__' is not an own property


var getProperty = function getProperty(obj, name) {
  if (name === '__proto__') {
    if (!hasOwn.call(obj, name)) {
      return void 0;
    } else if (gOPD) {
      // In early versions of node, obj['__proto__'] is buggy when obj has
      // __proto__ as an own property. Object.getOwnPropertyDescriptor() works.
      return gOPD(obj, name).value;
    }
  }

  return obj[name];
};

module.exports = function extend() {
  var options, name, src, copy, copyIsArray, clone;
  var target = arguments[0];
  var i = 1;
  var length = arguments.length;
  var deep = false; // Handle a deep copy situation

  if (typeof target === 'boolean') {
    deep = target;
    target = arguments[1] || {}; // skip the boolean and the target

    i = 2;
  }

  if (target == null || typeof target !== 'object' && typeof target !== 'function') {
    target = {};
  }

  for (; i < length; ++i) {
    options = arguments[i]; // Only deal with non-null/undefined values

    if (options != null) {
      // Extend the base object
      for (name in options) {
        src = getProperty(target, name);
        copy = getProperty(options, name); // Prevent never-ending loop

        if (target !== copy) {
          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (isPlainObject(copy) || (copyIsArray = isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && isArray(src) ? src : [];
            } else {
              clone = src && isPlainObject(src) ? src : {};
            } // Never move original objects, clone them


            setProperty(target, {
              name: name,
              newValue: extend(deep, clone, copy)
            }); // Don't bring in undefined values
          } else if (typeof copy !== 'undefined') {
            setProperty(target, {
              name: name,
              newValue: copy
            });
          }
        }
      }
    }
  } // Return the modified object


  return target;
};

/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is_any_array__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Computes the minimum of the given values
 * @param {Array<number>} input
 * @return {number}
 */

function min(input) {
  if (!is_any_array__WEBPACK_IMPORTED_MODULE_0___default()(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  var min = input[0];

  for (var i = 1; i < input.length; i++) {
    if (input[i] < min) min = input[i];
  }

  return min;
}

/* harmony default export */ __webpack_exports__["default"] = (min);

/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var median_quickselect__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(42);
/* harmony import */ var median_quickselect__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(median_quickselect__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is_any_array__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Computes the median of the given values
 * @param {Array<number>} input
 * @return {number}
 */

function median(input) {
  if (!is_any_array__WEBPACK_IMPORTED_MODULE_1___default()(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  return median_quickselect__WEBPACK_IMPORTED_MODULE_0___default()(input.slice());
}

/* harmony default export */ __webpack_exports__["default"] = (median);

/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return XSadd; });
const LOOP = 8;
const FLOAT_MUL = 1 / 16777216;
const sh1 = 15;
const sh2 = 18;
const sh3 = 11;

function multiply_uint32(n, m) {
  n >>>= 0;
  m >>>= 0;
  const nlo = n & 0xffff;
  const nhi = n - nlo;
  return (nhi * m >>> 0) + nlo * m >>> 0;
}

class XSadd {
  constructor() {
    let seed = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : Date.now();
    this.state = new Uint32Array(4);
    this.init(seed);
    this.random = this.getFloat.bind(this);
  }
  /**
   * Returns a 32-bit integer r (0 <= r < 2^32)
   */


  getUint32() {
    this.nextState();
    return this.state[3] + this.state[2] >>> 0;
  }
  /**
   * Returns a floating point number r (0.0 <= r < 1.0)
   */


  getFloat() {
    return (this.getUint32() >>> 8) * FLOAT_MUL;
  }

  init(seed) {
    if (!Number.isInteger(seed)) {
      throw new TypeError('seed must be an integer');
    }

    this.state[0] = seed;
    this.state[1] = 0;
    this.state[2] = 0;
    this.state[3] = 0;

    for (let i = 1; i < LOOP; i++) {
      this.state[i & 3] ^= i + multiply_uint32(1812433253, this.state[i - 1 & 3] ^ this.state[i - 1 & 3] >>> 30 >>> 0) >>> 0;
    }

    this.periodCertification();

    for (let i = 0; i < LOOP; i++) {
      this.nextState();
    }
  }

  periodCertification() {
    if (this.state[0] === 0 && this.state[1] === 0 && this.state[2] === 0 && this.state[3] === 0) {
      this.state[0] = 88; // X

      this.state[1] = 83; // S

      this.state[2] = 65; // A

      this.state[3] = 68; // D
    }
  }

  nextState() {
    let t = this.state[0];
    t ^= t << sh1;
    t ^= t >>> sh2;
    t ^= this.state[3] << sh3;
    this.state[0] = this.state[1];
    this.state[1] = this.state[2];
    this.state[2] = this.state[3];
    this.state[3] = t;
  }

}

/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is_any_array__WEBPACK_IMPORTED_MODULE_0__);


function _typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
/**
 * Fill an array with sequential numbers
 * @param {Array<number>} [input] - optional destination array (if not provided a new array will be created)
 * @param {object} [options={}]
 * @param {number} [options.from=0] - first value in the array
 * @param {number} [options.to=10] - last value in the array
 * @param {number} [options.size=input.length] - size of the array (if not provided calculated from step)
 * @param {number} [options.step] - if not provided calculated from size
 * @return {Array<number>}
 */


function sequentialFill() {
  var input = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (_typeof(input) === 'object' && !is_any_array__WEBPACK_IMPORTED_MODULE_0___default()(input)) {
    options = input;
    input = [];
  }

  if (!is_any_array__WEBPACK_IMPORTED_MODULE_0___default()(input)) {
    throw new TypeError('input must be an array');
  }

  var _options = options,
      _options$from = _options.from,
      from = _options$from === void 0 ? 0 : _options$from,
      _options$to = _options.to,
      to = _options$to === void 0 ? 10 : _options$to,
      _options$size = _options.size,
      size = _options$size === void 0 ? input.length : _options$size,
      step = _options.step;

  if (size && step) {
    throw new Error('step is defined by the array size');
  }

  if (!size) {
    if (step) {
      size = Math.floor((to - from) / step) + 1;
    } else {
      size = to - from + 1;
    }
  }

  if (!step && size) {
    step = (to - from) / (size - 1);
  }

  if (Array.isArray(input)) {
    input.length = 0; // only works with normal array

    for (var i = 0; i < size; i++) {
      input.push(from);
      from += step;
    }
  } else {
    if (input.length !== size) {
      throw new Error('sequentialFill typed array must have the correct length');
    }

    for (var _i = 0; _i < size; _i++) {
      input[_i] = from;
      from += step;
    }
  }

  return input;
}

/* harmony default export */ __webpack_exports__["default"] = (sequentialFill);

/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ml_array_mean__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(5);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(1);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(is_any_array__WEBPACK_IMPORTED_MODULE_1__);


/**
 * Computes the variance of the given values
 * @param {Array} values
 * @param {object} [options]
 * @param {boolean} [options.unbiased = true] - if true, divide by (n-1); if false, divide by n.
 * @param {number} [options.mean = arrayMean] - precalculated mean, if any.
 * @return {number}
 */

function variance(values) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (!is_any_array__WEBPACK_IMPORTED_MODULE_1___default()(values)) {
    throw new TypeError('input must be an array');
  }

  var _options$unbiased = options.unbiased,
      unbiased = _options$unbiased === void 0 ? true : _options$unbiased,
      _options$mean = options.mean,
      mean = _options$mean === void 0 ? Object(ml_array_mean__WEBPACK_IMPORTED_MODULE_0__["default"])(values) : _options$mean;
  var sqrError = 0;

  for (var i = 0; i < values.length; i++) {
    var x = values[i] - mean;
    sqrError += x * x;
  }

  if (unbiased) {
    return sqrError / (values.length - 1);
  } else {
    return sqrError / values.length;
  }
}

/* harmony default export */ __webpack_exports__["default"] = (variance);

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function compareNumbers(a, b) {
  return a - b;
}
/**
 * Computes the sum of the given values
 * @param {Array} values
 * @returns {number}
 */


exports.sum = function sum(values) {
  var sum = 0;

  for (var i = 0; i < values.length; i++) {
    sum += values[i];
  }

  return sum;
};
/**
 * Computes the maximum of the given values
 * @param {Array} values
 * @returns {number}
 */


exports.max = function max(values) {
  var max = values[0];
  var l = values.length;

  for (var i = 1; i < l; i++) {
    if (values[i] > max) max = values[i];
  }

  return max;
};
/**
 * Computes the minimum of the given values
 * @param {Array} values
 * @returns {number}
 */


exports.min = function min(values) {
  var min = values[0];
  var l = values.length;

  for (var i = 1; i < l; i++) {
    if (values[i] < min) min = values[i];
  }

  return min;
};
/**
 * Computes the min and max of the given values
 * @param {Array} values
 * @returns {{min: number, max: number}}
 */


exports.minMax = function minMax(values) {
  var min = values[0];
  var max = values[0];
  var l = values.length;

  for (var i = 1; i < l; i++) {
    if (values[i] < min) min = values[i];
    if (values[i] > max) max = values[i];
  }

  return {
    min: min,
    max: max
  };
};
/**
 * Computes the arithmetic mean of the given values
 * @param {Array} values
 * @returns {number}
 */


exports.arithmeticMean = function arithmeticMean(values) {
  var sum = 0;
  var l = values.length;

  for (var i = 0; i < l; i++) {
    sum += values[i];
  }

  return sum / l;
};
/**
 * {@link arithmeticMean}
 */


exports.mean = exports.arithmeticMean;
/**
 * Computes the geometric mean of the given values
 * @param {Array} values
 * @returns {number}
 */

exports.geometricMean = function geometricMean(values) {
  var mul = 1;
  var l = values.length;

  for (var i = 0; i < l; i++) {
    mul *= values[i];
  }

  return Math.pow(mul, 1 / l);
};
/**
 * Computes the mean of the log of the given values
 * If the return value is exponentiated, it gives the same result as the
 * geometric mean.
 * @param {Array} values
 * @returns {number}
 */


exports.logMean = function logMean(values) {
  var lnsum = 0;
  var l = values.length;

  for (var i = 0; i < l; i++) {
    lnsum += Math.log(values[i]);
  }

  return lnsum / l;
};
/**
 * Computes the weighted grand mean for a list of means and sample sizes
 * @param {Array} means - Mean values for each set of samples
 * @param {Array} samples - Number of original values for each set of samples
 * @returns {number}
 */


exports.grandMean = function grandMean(means, samples) {
  var sum = 0;
  var n = 0;
  var l = means.length;

  for (var i = 0; i < l; i++) {
    sum += samples[i] * means[i];
    n += samples[i];
  }

  return sum / n;
};
/**
 * Computes the truncated mean of the given values using a given percentage
 * @param {Array} values
 * @param {number} percent - The percentage of values to keep (range: [0,1])
 * @param {boolean} [alreadySorted=false]
 * @returns {number}
 */


exports.truncatedMean = function truncatedMean(values, percent, alreadySorted) {
  if (alreadySorted === undefined) alreadySorted = false;

  if (!alreadySorted) {
    values = [].concat(values).sort(compareNumbers);
  }

  var l = values.length;
  var k = Math.floor(l * percent);
  var sum = 0;

  for (var i = k; i < l - k; i++) {
    sum += values[i];
  }

  return sum / (l - 2 * k);
};
/**
 * Computes the harmonic mean of the given values
 * @param {Array} values
 * @returns {number}
 */


exports.harmonicMean = function harmonicMean(values) {
  var sum = 0;
  var l = values.length;

  for (var i = 0; i < l; i++) {
    if (values[i] === 0) {
      throw new RangeError('value at index ' + i + 'is zero');
    }

    sum += 1 / values[i];
  }

  return l / sum;
};
/**
 * Computes the contraharmonic mean of the given values
 * @param {Array} values
 * @returns {number}
 */


exports.contraHarmonicMean = function contraHarmonicMean(values) {
  var r1 = 0;
  var r2 = 0;
  var l = values.length;

  for (var i = 0; i < l; i++) {
    r1 += values[i] * values[i];
    r2 += values[i];
  }

  if (r2 < 0) {
    throw new RangeError('sum of values is negative');
  }

  return r1 / r2;
};
/**
 * Computes the median of the given values
 * @param {Array} values
 * @param {boolean} [alreadySorted=false]
 * @returns {number}
 */


exports.median = function median(values, alreadySorted) {
  if (alreadySorted === undefined) alreadySorted = false;

  if (!alreadySorted) {
    values = [].concat(values).sort(compareNumbers);
  }

  var l = values.length;
  var half = Math.floor(l / 2);

  if (l % 2 === 0) {
    return (values[half - 1] + values[half]) * 0.5;
  } else {
    return values[half];
  }
};
/**
 * Computes the variance of the given values
 * @param {Array} values
 * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
 * @returns {number}
 */


exports.variance = function variance(values, unbiased) {
  if (unbiased === undefined) unbiased = true;
  var theMean = exports.mean(values);
  var theVariance = 0;
  var l = values.length;

  for (var i = 0; i < l; i++) {
    var x = values[i] - theMean;
    theVariance += x * x;
  }

  if (unbiased) {
    return theVariance / (l - 1);
  } else {
    return theVariance / l;
  }
};
/**
 * Computes the standard deviation of the given values
 * @param {Array} values
 * @param {boolean} [unbiased=true] - if true, divide by (n-1); if false, divide by n.
 * @returns {number}
 */


exports.standardDeviation = function standardDeviation(values, unbiased) {
  return Math.sqrt(exports.variance(values, unbiased));
};

exports.standardError = function standardError(values) {
  return exports.standardDeviation(values) / Math.sqrt(values.length);
};
/**
 * IEEE Transactions on biomedical engineering, vol. 52, no. 1, january 2005, p. 76-
 * Calculate the standard deviation via the Median of the absolute deviation
 *  The formula for the standard deviation only holds for Gaussian random variables.
 * @returns {{mean: number, stdev: number}}
 */


exports.robustMeanAndStdev = function robustMeanAndStdev(y) {
  var mean = 0,
      stdev = 0;
  var length = y.length,
      i = 0;

  for (i = 0; i < length; i++) {
    mean += y[i];
  }

  mean /= length;
  var averageDeviations = new Array(length);

  for (i = 0; i < length; i++) averageDeviations[i] = Math.abs(y[i] - mean);

  averageDeviations.sort(compareNumbers);

  if (length % 2 === 1) {
    stdev = averageDeviations[(length - 1) / 2] / 0.6745;
  } else {
    stdev = 0.5 * (averageDeviations[length / 2] + averageDeviations[length / 2 - 1]) / 0.6745;
  }

  return {
    mean: mean,
    stdev: stdev
  };
};

exports.quartiles = function quartiles(values, alreadySorted) {
  if (typeof alreadySorted === 'undefined') alreadySorted = false;

  if (!alreadySorted) {
    values = [].concat(values).sort(compareNumbers);
  }

  var quart = values.length / 4;
  var q1 = values[Math.ceil(quart) - 1];
  var q2 = exports.median(values, true);
  var q3 = values[Math.ceil(quart * 3) - 1];
  return {
    q1: q1,
    q2: q2,
    q3: q3
  };
};

exports.pooledStandardDeviation = function pooledStandardDeviation(samples, unbiased) {
  return Math.sqrt(exports.pooledVariance(samples, unbiased));
};

exports.pooledVariance = function pooledVariance(samples, unbiased) {
  if (typeof unbiased === 'undefined') unbiased = true;
  var sum = 0;
  var length = 0,
      l = samples.length;

  for (var i = 0; i < l; i++) {
    var values = samples[i];
    var vari = exports.variance(values);
    sum += (values.length - 1) * vari;
    if (unbiased) length += values.length - 1;else length += values.length;
  }

  return sum / length;
};

exports.mode = function mode(values) {
  var l = values.length,
      itemCount = new Array(l),
      i;

  for (i = 0; i < l; i++) {
    itemCount[i] = 0;
  }

  var itemArray = new Array(l);
  var count = 0;

  for (i = 0; i < l; i++) {
    var index = itemArray.indexOf(values[i]);
    if (index >= 0) itemCount[index]++;else {
      itemArray[count] = values[i];
      itemCount[count] = 1;
      count++;
    }
  }

  var maxValue = 0,
      maxIndex = 0;

  for (i = 0; i < count; i++) {
    if (itemCount[i] > maxValue) {
      maxValue = itemCount[i];
      maxIndex = i;
    }
  }

  return itemArray[maxIndex];
};

exports.covariance = function covariance(vector1, vector2, unbiased) {
  if (typeof unbiased === 'undefined') unbiased = true;
  var mean1 = exports.mean(vector1);
  var mean2 = exports.mean(vector2);
  if (vector1.length !== vector2.length) throw 'Vectors do not have the same dimensions';
  var cov = 0,
      l = vector1.length;

  for (var i = 0; i < l; i++) {
    var x = vector1[i] - mean1;
    var y = vector2[i] - mean2;
    cov += x * y;
  }

  if (unbiased) return cov / (l - 1);else return cov / l;
};

exports.skewness = function skewness(values, unbiased) {
  if (typeof unbiased === 'undefined') unbiased = true;
  var theMean = exports.mean(values);
  var s2 = 0,
      s3 = 0,
      l = values.length;

  for (var i = 0; i < l; i++) {
    var dev = values[i] - theMean;
    s2 += dev * dev;
    s3 += dev * dev * dev;
  }

  var m2 = s2 / l;
  var m3 = s3 / l;
  var g = m3 / Math.pow(m2, 3 / 2.0);

  if (unbiased) {
    var a = Math.sqrt(l * (l - 1));
    var b = l - 2;
    return a / b * g;
  } else {
    return g;
  }
};

exports.kurtosis = function kurtosis(values, unbiased) {
  if (typeof unbiased === 'undefined') unbiased = true;
  var theMean = exports.mean(values);
  var n = values.length,
      s2 = 0,
      s4 = 0;

  for (var i = 0; i < n; i++) {
    var dev = values[i] - theMean;
    s2 += dev * dev;
    s4 += dev * dev * dev * dev;
  }

  var m2 = s2 / n;
  var m4 = s4 / n;

  if (unbiased) {
    var v = s2 / (n - 1);
    var a = n * (n + 1) / ((n - 1) * (n - 2) * (n - 3));
    var b = s4 / (v * v);
    var c = (n - 1) * (n - 1) / ((n - 2) * (n - 3));
    return a * b - 3 * c;
  } else {
    return m4 / (m2 * m2) - 3;
  }
};

exports.entropy = function entropy(values, eps) {
  if (typeof eps === 'undefined') eps = 0;
  var sum = 0,
      l = values.length;

  for (var i = 0; i < l; i++) sum += values[i] * Math.log(values[i] + eps);

  return -sum;
};

exports.weightedMean = function weightedMean(values, weights) {
  var sum = 0,
      l = values.length;

  for (var i = 0; i < l; i++) sum += values[i] * weights[i];

  return sum;
};

exports.weightedStandardDeviation = function weightedStandardDeviation(values, weights) {
  return Math.sqrt(exports.weightedVariance(values, weights));
};

exports.weightedVariance = function weightedVariance(values, weights) {
  var theMean = exports.weightedMean(values, weights);
  var vari = 0,
      l = values.length;
  var a = 0,
      b = 0;

  for (var i = 0; i < l; i++) {
    var z = values[i] - theMean;
    var w = weights[i];
    vari += w * (z * z);
    b += w;
    a += w * w;
  }

  return vari * (b / (b * b - a));
};

exports.center = function center(values, inPlace) {
  if (typeof inPlace === 'undefined') inPlace = false;
  var result = values;
  if (!inPlace) result = [].concat(values);
  var theMean = exports.mean(result),
      l = result.length;

  for (var i = 0; i < l; i++) result[i] -= theMean;
};

exports.standardize = function standardize(values, standardDev, inPlace) {
  if (typeof standardDev === 'undefined') standardDev = exports.standardDeviation(values);
  if (typeof inPlace === 'undefined') inPlace = false;
  var l = values.length;
  var result = inPlace ? values : new Array(l);

  for (var i = 0; i < l; i++) result[i] = values[i] / standardDev;

  return result;
};

exports.cumulativeSum = function cumulativeSum(array) {
  var l = array.length;
  var result = new Array(l);
  result[0] = array[0];

  for (var i = 1; i < l; i++) result[i] = result[i - 1] + array[i];

  return result;
};

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Cluster = __webpack_require__(15);

const util = __webpack_require__(49);

function ClusterLeaf(index) {
  Cluster.call(this);
  this.index = index;
  this.distance = 0;
  this.children = [];
}

util.inherits(ClusterLeaf, Cluster);
module.exports = ClusterLeaf;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Computes a distance/similarity matrix given an array of data and a distance/similarity function.
 * @param {Array} data An array of data
 * @param {function} distanceFn  A function that accepts two arguments and computes a distance/similarity between them
 * @return {Array<Array>} The similarity matrix. The similarity matrix is square and has a size equal to the length of
 * the data array
 */

function distanceMatrix(data, distanceFn) {
  const length = data.length;
  let result = Array.from({
    length
  }).map(() => Array.from({
    length
  })); // Compute upper distance matrix

  for (let i = 0; i < length; i++) {
    for (let j = 0; j <= i; j++) {
      result[i][j] = distanceFn(data[i], data[j]);
    }
  } // Copy to lower distance matrix


  for (let i = 0; i < length; i++) {
    for (let j = i + 1; j < length; j++) {
      result[i][j] = result[j][i];
    }
  }

  return result;
}

module.exports = distanceMatrix;

/***/ }),
/* 25 */
/***/ (function(module, exports) {

/**
 *  Constructs a confusion matrix
 * @class ConfusionMatrix
 * @example
 * const CM = new ConfusionMatrix([[13, 2], [10, 5]], ['cat', 'dog'])
 * @param {Array<Array<number>>} matrix - The confusion matrix, a 2D Array. Rows represent the actual label and columns
 *     the predicted label.
 * @param {Array<any>} labels - Labels of the confusion matrix, a 1D Array
 */
class ConfusionMatrix {
  constructor(matrix, labels) {
    if (matrix.length !== matrix[0].length) {
      throw new Error('Confusion matrix must be square');
    }

    if (labels.length !== matrix.length) {
      throw new Error('Confusion matrix and labels should have the same length');
    }

    this.labels = labels;
    this.matrix = matrix;
  }
  /**
   * Construct confusion matrix from the predicted and actual labels (classes). Be sure to provide the arguments in
   * the correct order!
   * @param {Array<any>} actual  - The predicted labels of the classification
   * @param {Array<any>} predicted     - The actual labels of the classification. Has to be of same length as
   *     predicted.
   * @param {object} [options] - Additional options
   * @param {Array<any>} [options.labels] - The list of labels that should be used. If not provided the distinct set
   *     of labels present in predicted and actual is used. Labels are compared using the strict equality operator
   *     '==='
   * @return {ConfusionMatrix} - Confusion matrix
   */


  static fromLabels(actual, predicted) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (predicted.length !== actual.length) {
      throw new Error('predicted and actual must have the same length');
    }

    let distinctLabels;

    if (options.labels) {
      distinctLabels = new Set(options.labels);
    } else {
      distinctLabels = new Set([...actual, ...predicted]);
    }

    distinctLabels = Array.from(distinctLabels);

    if (options.sort) {
      distinctLabels.sort(options.sort);
    } // Create confusion matrix and fill with 0's


    const matrix = Array.from({
      length: distinctLabels.length
    });

    for (let i = 0; i < matrix.length; i++) {
      matrix[i] = new Array(matrix.length);
      matrix[i].fill(0);
    }

    for (let i = 0; i < predicted.length; i++) {
      const actualIdx = distinctLabels.indexOf(actual[i]);
      const predictedIdx = distinctLabels.indexOf(predicted[i]);

      if (actualIdx >= 0 && predictedIdx >= 0) {
        matrix[actualIdx][predictedIdx]++;
      }
    }

    return new ConfusionMatrix(matrix, distinctLabels);
  }
  /**
   * Get the confusion matrix
   * @return {Array<Array<number> >}
   */


  getMatrix() {
    return this.matrix;
  }

  getLabels() {
    return this.labels;
  }
  /**
   * Get the total number of samples
   * @return {number}
   */


  getTotalCount() {
    let predicted = 0;

    for (var i = 0; i < this.matrix.length; i++) {
      for (var j = 0; j < this.matrix.length; j++) {
        predicted += this.matrix[i][j];
      }
    }

    return predicted;
  }
  /**
   * Get the total number of true predictions
   * @return {number}
   */


  getTrueCount() {
    var count = 0;

    for (var i = 0; i < this.matrix.length; i++) {
      count += this.matrix[i][i];
    }

    return count;
  }
  /**
   * Get the total number of false predictions.
   * @return {number}
   */


  getFalseCount() {
    return this.getTotalCount() - this.getTrueCount();
  }
  /**
   * Get the number of true positive predictions.
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getTruePositiveCount(label) {
    const index = this.getIndex(label);
    return this.matrix[index][index];
  }
  /**
   * Get the number of true negative predictions
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getTrueNegativeCount(label) {
    const index = this.getIndex(label);
    var count = 0;

    for (var i = 0; i < this.matrix.length; i++) {
      for (var j = 0; j < this.matrix.length; j++) {
        if (i !== index && j !== index) {
          count += this.matrix[i][j];
        }
      }
    }

    return count;
  }
  /**
   * Get the number of false positive predictions.
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getFalsePositiveCount(label) {
    const index = this.getIndex(label);
    var count = 0;

    for (var i = 0; i < this.matrix.length; i++) {
      if (i !== index) {
        count += this.matrix[i][index];
      }
    }

    return count;
  }
  /**
   * Get the number of false negative predictions.
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getFalseNegativeCount(label) {
    const index = this.getIndex(label);
    var count = 0;

    for (var i = 0; i < this.matrix.length; i++) {
      if (i !== index) {
        count += this.matrix[index][i];
      }
    }

    return count;
  }
  /**
   * Get the number of real positive samples.
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getPositiveCount(label) {
    return this.getTruePositiveCount(label) + this.getFalseNegativeCount(label);
  }
  /**
   * Get the number of real negative samples.
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getNegativeCount(label) {
    return this.getTrueNegativeCount(label) + this.getFalsePositiveCount(label);
  }
  /**
   * Get the index in the confusion matrix that corresponds to the given label
   * @param {any} label - The label to search for
   * @throws if the label is not found
   * @return {number}
   */


  getIndex(label) {
    const index = this.labels.indexOf(label);
    if (index === -1) throw new Error('The label does not exist');
    return index;
  }
  /**
   * Get the true positive rate a.k.a. sensitivity. Computes the ratio between the number of true positive predictions and the total number of positive samples.
   * {@link https://en.wikipedia.org/wiki/Sensitivity_and_specificity}
   * @param {any} label - The label that should be considered "positive"
   * @return {number} - The true positive rate [0-1]
   */


  getTruePositiveRate(label) {
    return this.getTruePositiveCount(label) / this.getPositiveCount(label);
  }
  /**
   * Get the true negative rate a.k.a. specificity. Computes the ration between the number of true negative predictions and the total number of negative samples.
   * {@link https://en.wikipedia.org/wiki/Sensitivity_and_specificity}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getTrueNegativeRate(label) {
    return this.getTrueNegativeCount(label) / this.getNegativeCount(label);
  }
  /**
   * Get the positive predictive value a.k.a. precision. Computes TP / (TP + FP)
   * {@link https://en.wikipedia.org/wiki/Positive_and_negative_predictive_values}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getPositivePredictiveValue(label) {
    const TP = this.getTruePositiveCount(label);
    return TP / (TP + this.getFalsePositiveCount(label));
  }
  /**
   * Negative predictive value
   * {@link https://en.wikipedia.org/wiki/Positive_and_negative_predictive_values}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getNegativePredictiveValue(label) {
    const TN = this.getTrueNegativeCount(label);
    return TN / (TN + this.getFalseNegativeCount(label));
  }
  /**
   * False negative rate a.k.a. miss rate.
   * {@link https://en.wikipedia.org/wiki/Type_I_and_type_II_errors#False_positive_and_false_negative_rates}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getFalseNegativeRate(label) {
    return 1 - this.getTruePositiveRate(label);
  }
  /**
   * False positive rate a.k.a. fall-out rate.
   * {@link https://en.wikipedia.org/wiki/Type_I_and_type_II_errors#False_positive_and_false_negative_rates}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getFalsePositiveRate(label) {
    return 1 - this.getTrueNegativeRate(label);
  }
  /**
   * False discovery rate (FDR)
   * {@link https://en.wikipedia.org/wiki/False_discovery_rate}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getFalseDiscoveryRate(label) {
    const FP = this.getFalsePositiveCount(label);
    return FP / (FP + this.getTruePositiveCount(label));
  }
  /**
   * False omission rate (FOR)
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getFalseOmissionRate(label) {
    const FN = this.getFalseNegativeCount(label);
    return FN / (FN + this.getTruePositiveCount(label));
  }
  /**
   * F1 score
   * {@link https://en.wikipedia.org/wiki/F1_score}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getF1Score(label) {
    const TP = this.getTruePositiveCount(label);
    return 2 * TP / (2 * TP + this.getFalsePositiveCount(label) + this.getFalseNegativeCount(label));
  }
  /**
   * Matthews correlation coefficient (MCC)
   * {@link https://en.wikipedia.org/wiki/Matthews_correlation_coefficient}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getMatthewsCorrelationCoefficient(label) {
    const TP = this.getTruePositiveCount(label);
    const TN = this.getTrueNegativeCount(label);
    const FP = this.getFalsePositiveCount(label);
    const FN = this.getFalseNegativeCount(label);
    return (TP * TN - FP * FN) / Math.sqrt((TP + FP) * (TP + FN) * (TN + FP) * (TN + FN));
  }
  /**
   * Informedness
   * {@link https://en.wikipedia.org/wiki/Youden%27s_J_statistic}
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getInformedness(label) {
    return this.getTruePositiveRate(label) + this.getTrueNegativeRate(label) - 1;
  }
  /**
   * Markedness
   * @param {any} label - The label that should be considered "positive"
   * @return {number}
   */


  getMarkedness(label) {
    return this.getPositivePredictiveValue(label) + this.getNegativePredictiveValue(label) - 1;
  }
  /**
   * Get the confusion table.
   * @param {any} label - The label that should be considered "positive"
   * @return {Array<Array<number> >} - The 2x2 confusion table. [[TP, FN], [FP, TN]]
   */


  getConfusionTable(label) {
    return [[this.getTruePositiveCount(label), this.getFalseNegativeCount(label)], [this.getFalsePositiveCount(label), this.getTrueNegativeCount(label)]];
  }
  /**
   * Get total accuracy.
   * @return {number} - The ratio between the number of true predictions and total number of classifications ([0-1])
   */


  getAccuracy() {
    let correct = 0;
    let incorrect = 0;

    for (var i = 0; i < this.matrix.length; i++) {
      for (var j = 0; j < this.matrix.length; j++) {
        if (i === j) correct += this.matrix[i][j];else incorrect += this.matrix[i][j];
      }
    }

    return correct / (correct + incorrect);
  }
  /**
   * Returns the element in the confusion matrix that corresponds to the given actual and predicted labels.
   * @param {any} actual - The true label
   * @param {any} predicted - The predicted label
   * @return {number} - The element in the confusion matrix
   */


  getCount(actual, predicted) {
    const actualIndex = this.getIndex(actual);
    const predictedIndex = this.getIndex(predicted);
    return this.matrix[actualIndex][predictedIndex];
  }
  /**
   * Compute the general prediction accuracy
   * @deprecated Use getAccuracy
   * @return {number} - The prediction accuracy ([0-1]
   */


  get accuracy() {
    return this.getAccuracy();
  }
  /**
   * Compute the number of predicted observations
   * @deprecated Use getTotalCount
   * @return {number}
   */


  get total() {
    return this.getTotalCount();
  }

}

module.exports = ConfusionMatrix;

/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Matrix = __webpack_require__(0).Matrix;

var Utils = __webpack_require__(27);

const ACTIVATION_FUNCTIONS = __webpack_require__(28);

class Layer {
  /**
   * @private
   * Create a new layer with the given options
   * @param {object} options
   * @param {number} [options.inputSize] - Number of conections that enter the neurons.
   * @param {number} [options.outputSize] - Number of conections that leave the neurons.
   * @param {number} [options.regularization] - Regularization parameter.
   * @param {number} [options.epsilon] - Learning rate parameter.
   * @param {string} [options.activation] - Activation function parameter from the FeedForwardNeuralNetwork class.
   * @param {number} [options.activationParam] - Activation parameter if needed.
   */
  constructor(options) {
    this.inputSize = options.inputSize;
    this.outputSize = options.outputSize;
    this.regularization = options.regularization;
    this.epsilon = options.epsilon;
    this.activation = options.activation;
    this.activationParam = options.activationParam;
    var selectedFunction = ACTIVATION_FUNCTIONS[options.activation];
    var params = selectedFunction.activation.length;
    var actFunction = params > 1 ? val => selectedFunction.activation(val, options.activationParam) : selectedFunction.activation;
    var derFunction = params > 1 ? val => selectedFunction.derivate(val, options.activationParam) : selectedFunction.derivate;

    this.activationFunction = function (i, j) {
      this[i][j] = actFunction(this[i][j]);
    };

    this.derivate = function (i, j) {
      this[i][j] = derFunction(this[i][j]);
    };

    if (options.model) {
      // load model
      this.W = Matrix.checkMatrix(options.W);
      this.b = Matrix.checkMatrix(options.b);
    } else {
      // default constructor
      this.W = Matrix.rand(this.inputSize, this.outputSize);
      this.b = Matrix.zeros(1, this.outputSize);
      this.W.apply(function (i, j) {
        this[i][j] /= Math.sqrt(options.inputSize);
      });
    }
  }
  /**
   * @private
   * propagate the given input through the current layer.
   * @param {Matrix} X - input.
   * @return {Matrix} output at the current layer.
   */


  forward(X) {
    var z = X.mmul(this.W).addRowVector(this.b);
    z.apply(this.activationFunction);
    this.a = z.clone();
    return z;
  }
  /**
   * @private
   * apply backpropagation algorithm at the current layer
   * @param {Matrix} delta - delta values estimated at the following layer.
   * @param {Matrix} a - 'a' values from the following layer.
   * @return {Matrix} the new delta values for the next layer.
   */


  backpropagation(delta, a) {
    this.dW = a.transposeView().mmul(delta);
    this.db = Utils.sumCol(delta);
    var aCopy = a.clone();
    return delta.mmul(this.W.transposeView()).mul(aCopy.apply(this.derivate));
  }
  /**
   * @private
   * Function that updates the weights at the current layer with the derivatives.
   */


  update() {
    this.dW.add(this.W.clone().mul(this.regularization));
    this.W.add(this.dW.mul(-this.epsilon));
    this.b.add(this.db.mul(-this.epsilon));
  }
  /**
   * @private
   * Export the current layer to JSON.
   * @return {object} model
   */


  toJSON() {
    return {
      model: 'Layer',
      inputSize: this.inputSize,
      outputSize: this.outputSize,
      regularization: this.regularization,
      epsilon: this.epsilon,
      activation: this.activation,
      W: this.W,
      b: this.b
    };
  }
  /**
   * @private
   * Creates a new Layer with the given model.
   * @param {object} model
   * @return {Layer}
   */


  static load(model) {
    if (model.model !== 'Layer') {
      throw new RangeError('the current model is not a Layer model');
    }

    return new Layer(model);
  }

}

module.exports = Layer;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Matrix = __webpack_require__(0).Matrix;
/**
 * @private
 * Retrieves the sum at each row of the given matrix.
 * @param {Matrix} matrix
 * @return {Matrix}
 */


function sumRow(matrix) {
  var sum = Matrix.zeros(matrix.rows, 1);

  for (var i = 0; i < matrix.rows; ++i) {
    for (var j = 0; j < matrix.columns; ++j) {
      sum[i][0] += matrix[i][j];
    }
  }

  return sum;
}
/**
 * @private
 * Retrieves the sum at each column of the given matrix.
 * @param {Matrix} matrix
 * @return {Matrix}
 */


function sumCol(matrix) {
  var sum = Matrix.zeros(1, matrix.columns);

  for (var i = 0; i < matrix.rows; ++i) {
    for (var j = 0; j < matrix.columns; ++j) {
      sum[0][j] += matrix[i][j];
    }
  }

  return sum;
}
/**
 * @private
 * Method that given an array of labels(predictions), returns two dictionaries, one to transform from labels to
 * numbers and other in the reverse way
 * @param {Array} array
 * @return {object}
 */


function dictOutputs(array) {
  var inputs = {};
  var outputs = {};
  var index = 0;

  for (var i = 0; i < array.length; i += 1) {
    if (inputs[array[i]] === undefined) {
      inputs[array[i]] = index;
      outputs[index] = array[i];
      index++;
    }
  }

  return {
    inputs: inputs,
    outputs: outputs
  };
}

module.exports = {
  dictOutputs: dictOutputs,
  sumCol: sumCol,
  sumRow: sumRow
};

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


function logistic(val) {
  return 1 / (1 + Math.exp(-val));
}

function expELU(val, param) {
  return val < 0 ? param * (Math.exp(val) - 1) : val;
}

function softExponential(val, param) {
  if (param < 0) {
    return -Math.log(1 - param * (val + param)) / param;
  }

  if (param > 0) {
    return (Math.exp(param * val) - 1) / param + param;
  }

  return val;
}

function softExponentialPrime(val, param) {
  if (param < 0) {
    return 1 / (1 - param * (param + val));
  } else {
    return Math.exp(param * val);
  }
}

const ACTIVATION_FUNCTIONS = {
  tanh: {
    activation: Math.tanh,
    derivate: val => 1 - val * val
  },
  identity: {
    activation: val => val,
    derivate: () => 1
  },
  logistic: {
    activation: logistic,
    derivate: val => logistic(val) * (1 - logistic(val))
  },
  arctan: {
    activation: Math.atan,
    derivate: val => 1 / (val * val + 1)
  },
  softsign: {
    activation: val => val / (1 + Math.abs(val)),
    derivate: val => 1 / ((1 + Math.abs(val)) * (1 + Math.abs(val)))
  },
  relu: {
    activation: val => val < 0 ? 0 : val,
    derivate: val => val < 0 ? 0 : 1
  },
  softplus: {
    activation: val => Math.log(1 + Math.exp(val)),
    derivate: val => 1 / (1 + Math.exp(-val))
  },
  bent: {
    activation: val => (Math.sqrt(val * val + 1) - 1) / 2 + val,
    derivate: val => val / (2 * Math.sqrt(val * val + 1)) + 1
  },
  sinusoid: {
    activation: Math.sin,
    derivate: Math.cos
  },
  sinc: {
    activation: val => val === 0 ? 1 : Math.sin(val) / val,
    derivate: val => val === 0 ? 0 : Math.cos(val) / val - Math.sin(val) / (val * val)
  },
  gaussian: {
    activation: val => Math.exp(-(val * val)),
    derivate: val => -2 * val * Math.exp(-(val * val))
  },
  'parametric-relu': {
    activation: (val, param) => val < 0 ? param * val : val,
    derivate: (val, param) => val < 0 ? param : 1
  },
  'exponential-elu': {
    activation: expELU,
    derivate: (val, param) => val < 0 ? expELU(val, param) + param : 1
  },
  'soft-exponential': {
    activation: softExponential,
    derivate: softExponentialPrime
  }
};
module.exports = ACTIVATION_FUNCTIONS;

/***/ }),
/* 29 */
/***/ (function(module, exports) {

function NodeSquare(x, y, weights, som) {
  this.x = x;
  this.y = y;
  this.weights = weights;
  this.som = som;
  this.neighbors = {};
}

NodeSquare.prototype.adjustWeights = function adjustWeights(target, learningRate, influence) {
  for (var i = 0, ii = this.weights.length; i < ii; i++) {
    this.weights[i] += learningRate * influence * (target[i] - this.weights[i]);
  }
};

NodeSquare.prototype.getDistance = function getDistance(otherNode) {
  return Math.max(Math.abs(this.x - otherNode.x), Math.abs(this.y - otherNode.y));
};

NodeSquare.prototype.getDistanceTorus = function getDistanceTorus(otherNode) {
  var distX = Math.abs(this.x - otherNode.x),
      distY = Math.abs(this.y - otherNode.y);
  return Math.max(Math.min(distX, this.som.gridDim.x - distX), Math.min(distY, this.som.gridDim.y - distY));
};

NodeSquare.prototype.getNeighbors = function getNeighbors(xy) {
  if (!this.neighbors[xy]) {
    this.neighbors[xy] = new Array(2); // left or bottom neighbor

    var v;

    if (this[xy] > 0) {
      v = this[xy] - 1;
    } else if (this.som.torus) {
      v = this.som.gridDim[xy] - 1;
    }

    if (typeof v !== 'undefined') {
      var x, y;

      if (xy === 'x') {
        x = v;
        y = this.y;
      } else {
        x = this.x;
        y = v;
      }

      this.neighbors[xy][0] = this.som.nodes[x][y];
    } // top or right neighbor


    var w;

    if (this[xy] < this.som.gridDim[xy] - 1) {
      w = this[xy] + 1;
    } else if (this.som.torus) {
      w = 0;
    }

    if (typeof w !== 'undefined') {
      if (xy === 'x') {
        x = w;
        y = this.y;
      } else {
        x = this.x;
        y = w;
      }

      this.neighbors[xy][1] = this.som.nodes[x][y];
    }
  }

  return this.neighbors[xy];
};

NodeSquare.prototype.getPos = function getPos(xy, element) {
  var neighbors = this.getNeighbors(xy),
      distance = this.som.distance,
      bestNeighbor,
      direction;

  if (neighbors[0]) {
    if (neighbors[1]) {
      var dist1 = distance(element, neighbors[0].weights),
          dist2 = distance(element, neighbors[1].weights);

      if (dist1 < dist2) {
        bestNeighbor = neighbors[0];
        direction = -1;
      } else {
        bestNeighbor = neighbors[1];
        direction = 1;
      }
    } else {
      bestNeighbor = neighbors[0];
      direction = -1;
    }
  } else {
    bestNeighbor = neighbors[1];
    direction = 1;
  }

  var simA = 1 - distance(element, this.weights),
      simB = 1 - distance(element, bestNeighbor.weights);
  var factor = (simA - simB) / (2 - simA - simB);
  return 0.5 + 0.5 * factor * direction;
};

NodeSquare.prototype.getPosition = function getPosition(element) {
  return [this.getPos('x', element), this.getPos('y', element)];
};

module.exports = NodeSquare;

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.distance = __webpack_require__(75);
exports.similarity = __webpack_require__(112);

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function czekanowskiSimilarity(a, b) {
  var up = 0;
  var down = 0;

  for (var i = 0; i < a.length; i++) {
    up += Math.min(a[i], b[i]);
    down += a[i] + b[i];
  }

  return 2 * up / down;
};

/***/ }),
/* 32 */
/***/ (function(module, exports) {

module.exports = function dice(a, b) {
  var ii = a.length,
      p = 0,
      q1 = 0,
      q2 = 0;

  for (var i = 0; i < ii; i++) {
    p += a[i] * a[i];
    q1 += b[i] * b[i];
    q2 += (a[i] - b[i]) * (a[i] - b[i]);
  }

  return q2 / (p + q1);
};

/***/ }),
/* 33 */
/***/ (function(module, exports) {

module.exports = function intersection(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += Math.min(a[i], b[i]);
  }

  return 1 - ans;
};

/***/ }),
/* 34 */
/***/ (function(module, exports) {

module.exports = function jaccard(a, b) {
  var ii = a.length,
      p1 = 0,
      p2 = 0,
      q1 = 0,
      q2 = 0;

  for (var i = 0; i < ii; i++) {
    p1 += a[i] * b[i];
    p2 += a[i] * a[i];
    q1 += b[i] * b[i];
    q2 += (a[i] - b[i]) * (a[i] - b[i]);
  }

  return q2 / (p2 + q1 - p1);
};

/***/ }),
/* 35 */
/***/ (function(module, exports) {

module.exports = function kulczynski(a, b) {
  var ii = a.length,
      up = 0,
      down = 0;

  for (var i = 0; i < ii; i++) {
    up += Math.abs(a[i] - b[i]);
    down += Math.min(a[i], b[i]);
  }

  return up / down;
};

/***/ }),
/* 36 */
/***/ (function(module, exports) {

module.exports = function motyka(a, b) {
  var ii = a.length,
      up = 0,
      down = 0;

  for (var i = 0; i < ii; i++) {
    up += Math.min(a[i], b[i]);
    down += a[i] + b[i];
  }

  return 1 - up / down;
};

/***/ }),
/* 37 */
/***/ (function(module, exports) {

module.exports = function squaredChord(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += (Math.sqrt(a[i]) - Math.sqrt(b[i])) * (Math.sqrt(a[i]) - Math.sqrt(b[i]));
  }

  return ans;
};

/***/ }),
/* 38 */
/***/ (function(module, exports) {

module.exports = function tanimoto(a, b, bitvector) {
  if (bitvector) {
    var inter = 0,
        union = 0;

    for (var j = 0; j < a.length; j++) {
      inter += a[j] && b[j];
      union += a[j] || b[j];
    }

    if (union === 0) return 1;
    return inter / union;
  } else {
    var ii = a.length,
        p = 0,
        q = 0,
        m = 0;

    for (var i = 0; i < ii; i++) {
      p += a[i];
      q += b[i];
      m += Math.min(a[i], b[i]);
    }

    return 1 - (p + q - 2 * m) / (p + q - m);
  }
};

/***/ }),
/* 39 */
/***/ (function(module, exports) {

module.exports = function cosine(a, b) {
  var ii = a.length,
      p = 0,
      p2 = 0,
      q2 = 0;

  for (var i = 0; i < ii; i++) {
    p += a[i] * b[i];
    p2 += a[i] * a[i];
    q2 += b[i] * b[i];
  }

  return p / (Math.sqrt(p2) * Math.sqrt(q2));
};

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var extend = __webpack_require__(16);

var defaultOptions = {
  size: 1,
  value: 0
};
/**
 * Case when the entry is an array
 * @param data
 * @param options
 * @returns {Array}
 */

function arrayCase(data, options) {
  var len = data.length;
  if (typeof options.size === 'number') options.size = [options.size, options.size];
  var cond = len + options.size[0] + options.size[1];
  var output;

  if (options.output) {
    if (options.output.length !== cond) throw new RangeError('Wrong output size');
    output = options.output;
  } else output = new Array(cond);

  var i; // circular option

  if (options.value === 'circular') {
    for (i = 0; i < cond; i++) {
      if (i < options.size[0]) output[i] = data[(len - options.size[0] % len + i) % len];else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = data[(i - options.size[0]) % len];
    }
  } // replicate option
  else if (options.value === 'replicate') {
      for (i = 0; i < cond; i++) {
        if (i < options.size[0]) output[i] = data[0];else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = data[len - 1];
      }
    } // symmetric option
    else if (options.value === 'symmetric') {
        if (options.size[0] > len || options.size[1] > len) throw new RangeError('expanded value should not be bigger than the data length');

        for (i = 0; i < cond; i++) {
          if (i < options.size[0]) output[i] = data[options.size[0] - 1 - i];else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = data[2 * len + options.size[0] - i - 1];
        }
      } // default option
      else {
          for (i = 0; i < cond; i++) {
            if (i < options.size[0]) output[i] = options.value;else if (i < options.size[0] + len) output[i] = data[i - options.size[0]];else output[i] = options.value;
          }
        }

  return output;
}
/**
 * Case when the entry is a matrix
 * @param data
 * @param options
 * @returns {Array}
 */


function matrixCase(data, options) {
  var row = data.length;
  var col = data[0].length;
  if (options.size[0] === undefined) options.size = [options.size, options.size, options.size, options.size];
  throw new Error('matrix not supported yet, sorry');
}
/**
 * Pads and array
 * @param {Array <number>} data
 * @param {object} options
 */


function padArray(data, options) {
  options = extend({}, defaultOptions, options);

  if (Array.isArray(data)) {
    if (Array.isArray(data[0])) return matrixCase(data, options);else return arrayCase(data, options);
  } else throw new TypeError('data should be an array');
}

module.exports = padArray;

/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/ml-regression-base/src/maybeToPrecision.js
function maybeToPrecision(value, digits) {
  if (value < 0) {
    value = 0 - value;

    if (typeof digits === 'number') {
      return '- ' + value.toPrecision(digits);
    } else {
      return '- ' + value.toString();
    }
  } else {
    if (typeof digits === 'number') {
      return value.toPrecision(digits);
    } else {
      return value.toString();
    }
  }
}
// CONCATENATED MODULE: ./node_modules/ml-regression-base/src/checkArrayLength.js
function checkArraySize(x, y) {
  if (!Array.isArray(x) || !Array.isArray(y)) {
    throw new TypeError('x and y must be arrays');
  }

  if (x.length !== y.length) {
    throw new RangeError('x and y arrays must have the same length');
  }
}
// CONCATENATED MODULE: ./node_modules/ml-regression-base/src/index.js


class BaseRegression {
  constructor() {
    if (new.target === BaseRegression) {
      throw new Error('BaseRegression must be subclassed');
    }
  }

  predict(x) {
    if (typeof x === 'number') {
      return this._predict(x);
    } else if (Array.isArray(x)) {
      const y = new Array(x.length);

      for (let i = 0; i < x.length; i++) {
        y[i] = this._predict(x[i]);
      }

      return y;
    } else {
      throw new TypeError('x must be a number or array');
    }
  }

  _predict() {
    throw new Error('_predict must be implemented');
  }

  train() {//Do nothing for this package
  }

  toString() {
    return '';
  }

  toLaTeX() {
    return '';
  }
  /**
   * Return the correlation coefficient of determination (r) and chi-square.
   * @param {Array<number>} x
   * @param {Array<number>} y
   * @return {object}
   */


  score(x, y) {
    if (!Array.isArray(x) || !Array.isArray(y) || x.length !== y.length) {
      throw new Error('x and y must be arrays of the same length');
    }

    const n = x.length;
    const y2 = new Array(n);

    for (let i = 0; i < n; i++) {
      y2[i] = this._predict(x[i]);
    }

    let xSum = 0;
    let ySum = 0;
    let chi2 = 0;
    let rmsd = 0;
    let xSquared = 0;
    let ySquared = 0;
    let xY = 0;

    for (let i = 0; i < n; i++) {
      xSum += y2[i];
      ySum += y[i];
      xSquared += y2[i] * y2[i];
      ySquared += y[i] * y[i];
      xY += y2[i] * y[i];

      if (y[i] !== 0) {
        chi2 += (y[i] - y2[i]) * (y[i] - y2[i]) / y[i];
      }

      rmsd = (y[i] - y2[i]) * (y[i] - y2[i]);
    }

    const r = (n * xY - xSum * ySum) / Math.sqrt((n * xSquared - xSum * xSum) * (n * ySquared - ySum * ySum));
    return {
      r: r,
      r2: r * r,
      chi2: chi2,
      rmsd: rmsd * rmsd / n
    };
  }

}
// CONCATENATED MODULE: ./node_modules/ml-regression-simple-linear/src/index.js

class src_SimpleLinearRegression extends BaseRegression {
  constructor(x, y) {
    super();

    if (x === true) {
      this.slope = y.slope;
      this.intercept = y.intercept;
      this.coefficients = [y.intercept, y.slope];
    } else {
      checkArraySize(x, y);
      regress(this, x, y);
    }
  }

  toJSON() {
    return {
      name: 'simpleLinearRegression',
      slope: this.slope,
      intercept: this.intercept
    };
  }

  _predict(x) {
    return this.slope * x + this.intercept;
  }

  computeX(y) {
    return (y - this.intercept) / this.slope;
  }

  toString(precision) {
    let result = 'f(x) = ';

    if (this.slope !== 0) {
      const xFactor = maybeToPrecision(this.slope, precision);
      result += (xFactor === '1' ? '' : xFactor + ' * ') + 'x';

      if (this.intercept) {
        const absIntercept = Math.abs(this.intercept);
        const operator = absIntercept === this.intercept ? '+' : '-';
        result += " ".concat(operator, " ").concat(maybeToPrecision(absIntercept, precision));
      }
    } else {
      result += maybeToPrecision(this.intercept, precision);
    }

    return result;
  }

  toLaTeX(precision) {
    return this.toString(precision);
  }

  static load(json) {
    if (json.name !== 'simpleLinearRegression') {
      throw new TypeError('not a SLR model');
    }

    return new src_SimpleLinearRegression(true, json);
  }

}

function regress(slr, x, y) {
  const n = x.length;
  let xSum = 0;
  let ySum = 0;
  let xSquared = 0;
  let xY = 0;

  for (let i = 0; i < n; i++) {
    xSum += x[i];
    ySum += y[i];
    xSquared += x[i] * x[i];
    xY += x[i] * y[i];
  }

  const numerator = n * xY - xSum * ySum;
  slr.slope = numerator / (n * xSquared - xSum * xSum);
  slr.intercept = 1 / n * ySum - slr.slope * (1 / n) * xSum;
  slr.coefficients = [slr.intercept, slr.slope];
}
// EXTERNAL MODULE: ./node_modules/ml-matrix/src/index.js + 24 modules
var src = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/ml-regression-polynomial/src/index.js


class src_PolynomialRegression extends BaseRegression {
  constructor(x, y, degree) {
    super();

    if (x === true) {
      this.degree = y.degree;
      this.powers = y.powers;
      this.coefficients = y.coefficients;
    } else {
      checkArraySize(x, y);
      src_regress(this, x, y, degree);
    }
  }

  _predict(x) {
    let y = 0;

    for (let k = 0; k < this.powers.length; k++) {
      y += this.coefficients[k] * Math.pow(x, this.powers[k]);
    }

    return y;
  }

  toJSON() {
    return {
      name: 'polynomialRegression',
      degree: this.degree,
      powers: this.powers,
      coefficients: this.coefficients
    };
  }

  toString(precision) {
    return this._toFormula(precision, false);
  }

  toLaTeX(precision) {
    return this._toFormula(precision, true);
  }

  _toFormula(precision, isLaTeX) {
    let sup = '^';
    let closeSup = '';
    let times = ' * ';

    if (isLaTeX) {
      sup = '^{';
      closeSup = '}';
      times = '';
    }

    let fn = '';
    let str = '';

    for (let k = 0; k < this.coefficients.length; k++) {
      str = '';

      if (this.coefficients[k] !== 0) {
        if (this.powers[k] === 0) {
          str = maybeToPrecision(this.coefficients[k], precision);
        } else {
          if (this.powers[k] === 1) {
            str = maybeToPrecision(this.coefficients[k], precision) + times + 'x';
          } else {
            str = maybeToPrecision(this.coefficients[k], precision) + times + 'x' + sup + this.powers[k] + closeSup;
          }
        }

        if (this.coefficients[k] > 0 && k !== this.coefficients.length - 1) {
          str = ' + ' + str;
        } else if (k !== this.coefficients.length - 1) {
          str = ' ' + str;
        }
      }

      fn = str + fn;
    }

    if (fn.charAt(0) === '+') {
      fn = fn.slice(1);
    }

    return 'f(x) = ' + fn;
  }

  static load(json) {
    if (json.name !== 'polynomialRegression') {
      throw new TypeError('not a polynomial regression model');
    }

    return new src_PolynomialRegression(true, json);
  }

}

function src_regress(pr, x, y, degree) {
  const n = x.length;
  let powers;

  if (Array.isArray(degree)) {
    powers = degree;
    degree = powers.length;
  } else {
    degree++;
    powers = new Array(degree);

    for (let k = 0; k < degree; k++) {
      powers[k] = k;
    }
  }

  const F = new src["default"](n, degree);
  const Y = new src["default"]([y]);

  for (let k = 0; k < degree; k++) {
    for (let i = 0; i < n; i++) {
      if (powers[k] === 0) {
        F[i][k] = 1;
      } else {
        F[i][k] = Math.pow(x[i], powers[k]);
      }
    }
  }

  const FT = F.transposeView();
  const A = FT.mmul(F);
  const B = FT.mmul(Y.transposeView());
  pr.degree = degree - 1;
  pr.powers = powers;
  pr.coefficients = Object(src["solve"])(A, B).to1DArray();
}
// CONCATENATED MODULE: ./node_modules/ml-regression-exponential/src/index.js


class src_ExponentialRegression extends BaseRegression {
  constructor(x, y) {
    super();

    if (x === true) {
      this.A = y.A;
      this.B = y.B;
    } else {
      checkArraySize(x, y);
      ml_regression_exponential_src_regress(this, x, y);
    }
  }

  _predict(input) {
    return this.B * Math.exp(input * this.A);
  }

  toJSON() {
    return {
      name: 'exponentialRegression',
      A: this.A,
      B: this.B
    };
  }

  toString(precision) {
    return 'f(x) = ' + maybeToPrecision(this.B, precision) + ' * e^(' + maybeToPrecision(this.A, precision) + ' * x)';
  }

  toLaTeX(precision) {
    if (this.A >= 0) {
      return 'f(x) = ' + maybeToPrecision(this.B, precision) + 'e^{' + maybeToPrecision(this.A, precision) + 'x}';
    } else {
      return 'f(x) = \\frac{' + maybeToPrecision(this.B, precision) + '}{e^{' + maybeToPrecision(-this.A, precision) + 'x}}';
    }
  }

  static load(json) {
    if (json.name !== 'exponentialRegression') {
      throw new TypeError('not a exponential regression model');
    }

    return new src_ExponentialRegression(true, json);
  }

}

function ml_regression_exponential_src_regress(er, x, y) {
  const n = x.length;
  const yl = new Array(n);

  for (let i = 0; i < n; i++) {
    yl[i] = Math.log(y[i]);
  }

  const linear = new src_SimpleLinearRegression(x, yl);
  er.A = linear.slope;
  er.B = Math.exp(linear.intercept);
}
// CONCATENATED MODULE: ./node_modules/ml-regression-power/src/index.js


class src_PowerRegression extends BaseRegression {
  constructor(x, y) {
    super();

    if (x === true) {
      // reloading model
      this.A = y.A;
      this.B = y.B;
    } else {
      checkArraySize(x, y);
      ml_regression_power_src_regress(this, x, y);
    }
  }

  _predict(newInputs) {
    return this.A * Math.pow(newInputs, this.B);
  }

  toJSON() {
    return {
      name: 'powerRegression',
      A: this.A,
      B: this.B
    };
  }

  toString(precision) {
    return 'f(x) = ' + maybeToPrecision(this.A, precision) + ' * x^' + maybeToPrecision(this.B, precision);
  }

  toLaTeX(precision) {
    if (this.B >= 0) {
      return 'f(x) = ' + maybeToPrecision(this.A, precision) + 'x^{' + maybeToPrecision(this.B, precision) + '}';
    } else {
      return 'f(x) = \\frac{' + maybeToPrecision(this.A, precision) + '}{x^{' + maybeToPrecision(-this.B, precision) + '}}';
    }
  }

  static load(json) {
    if (json.name !== 'powerRegression') {
      throw new TypeError('not a power regression model');
    }

    return new src_PowerRegression(true, json);
  }

}

function ml_regression_power_src_regress(pr, x, y) {
  const n = x.length;
  const xl = new Array(n);
  const yl = new Array(n);

  for (let i = 0; i < n; i++) {
    xl[i] = Math.log(x[i]);
    yl[i] = Math.log(y[i]);
  }

  const linear = new src_SimpleLinearRegression(xl, yl);
  pr.A = Math.exp(linear.intercept);
  pr.B = linear.slope;
}
// CONCATENATED MODULE: ./node_modules/ml-regression-multivariate-linear/src/index.js


class src_MultivariateLinearRegression extends BaseRegression {
  constructor(x, y) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
    const {
      intercept = true,
      statistics = true
    } = options;
    super();
    this.statistics = statistics;

    if (x === true) {
      this.weights = y.weights;
      this.inputs = y.inputs;
      this.outputs = y.outputs;
      this.intercept = y.intercept;
    } else {
      x = new src["default"](x);

      if (intercept) {
        x.addColumn(new Array(x.length).fill(1));
      }

      const beta = new src["SVD"](x, {
        autoTranspose: true
      }).solve(y);
      this.weights = beta.to2DArray();
      this.inputs = x[0].length;
      this.outputs = y[0].length;
      if (intercept) this.inputs--;
      this.intercept = intercept;

      if (statistics) {
        /*
         * Let's add some basic statistics about the beta's to be able to interpret them.
         * source: http://dept.stat.lsa.umich.edu/~kshedden/Courses/Stat401/Notes/401-multreg.pdf
         * validated against Excel Regression AddIn
         * test: "datamining statistics test"
         */
        const fittedValues = x.mmul(beta);
        const residuals = new src["default"](y).addM(fittedValues.neg());
        const variance = residuals.to2DArray().map(ri => Math.pow(ri[0], 2)).reduce((a, b) => a + b) / (y.length - x.columns);
        this.stdError = Math.sqrt(variance);
        this.stdErrorMatrix = x.transposeView().mmul(x).pseudoInverse().mul(variance);
        this.stdErrors = this.stdErrorMatrix.diagonal().map(d => Math.sqrt(d));
        this.tStats = this.weights.map((d, i) => this.stdErrors[i] === 0 ? 0 : d[0] / this.stdErrors[i]);
      }
    }
  }

  predict(x) {
    if (Array.isArray(x)) {
      if (typeof x[0] === 'number') {
        return this._predict(x);
      } else if (Array.isArray(x[0])) {
        const y = new Array(x.length);

        for (let i = 0; i < x.length; i++) {
          y[i] = this._predict(x[i]);
        }

        return y;
      }
    }

    throw new TypeError('x must be a matrix or array of numbers');
  }

  _predict(x) {
    const result = new Array(this.outputs);

    if (this.intercept) {
      for (let i = 0; i < this.outputs; i++) {
        result[i] = this.weights[this.inputs][i];
      }
    } else {
      result.fill(0);
    }

    for (let i = 0; i < this.inputs; i++) {
      for (let j = 0; j < this.outputs; j++) {
        result[j] += this.weights[i][j] * x[i];
      }
    }

    return result;
  }

  score() {
    throw new Error('score method is not implemented yet');
  }

  toJSON() {
    return {
      name: 'multivariateLinearRegression',
      weights: this.weights,
      inputs: this.inputs,
      outputs: this.outputs,
      intercept: this.intercept,
      summary: this.statistics ? {
        regressionStatistics: {
          standardError: this.stdError,
          observations: this.outputs
        },
        variables: this.weights.map((d, i) => {
          return {
            label: i === this.weights.length - 1 ? 'Intercept' : "X Variable ".concat(i + 1),
            coefficients: d,
            standardError: this.stdErrors[i],
            tStat: this.tStats[i]
          };
        })
      } : undefined
    };
  }

  static load(model) {
    if (model.name !== 'multivariateLinearRegression') {
      throw new Error('not a MLR model');
    }

    return new src_MultivariateLinearRegression(true, model);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-regression/src/regression/potential-regression.js



/*
 * Function that calculate the potential fit in the form f(x) = A*x^M
 * with a given M and return de A coefficient.
 *
 * @param {Vector} X - Vector of the x positions of the points.
 * @param {Vector} Y - Vector of the x positions of the points.
 * @param {Number} M - The exponent of the potential fit.
 * @return {Number} A - The A coefficient of the potential fit.
 */

class potential_regression_PotentialRegression extends BaseRegression {
  /**
   * @constructor
   * @param x: Independent variable
   * @param y: Dependent variable
   * @param M
   */
  constructor(x, y, M) {
    super();

    if (x === true) {
      // reloading model
      this.A = y.A;
      this.M = y.M;
    } else {
      var n = x.length;

      if (n !== y.length) {
        throw new RangeError('input and output array have a different length');
      }

      var linear = new src_PolynomialRegression(x, y, [M]);
      this.A = linear.coefficients[0];
      this.M = M;
    }
  }

  _predict(x) {
    return this.A * Math.pow(x, this.M);
  }

  toJSON() {
    return {
      name: 'potentialRegression',
      A: this.A,
      M: this.M
    };
  }

  toString(precision) {
    return 'f(x) = ' + maybeToPrecision(this.A, precision) + ' * x^' + this.M;
  }

  toLaTeX(precision) {
    if (this.M >= 0) {
      return 'f(x) = ' + maybeToPrecision(this.A, precision) + 'x^{' + this.M + '}';
    } else {
      return 'f(x) = \\frac{' + maybeToPrecision(this.A, precision) + '}{x^{' + -this.M + '}}';
    }
  }

  static load(json) {
    if (json.name !== 'potentialRegression') {
      throw new TypeError('not a potential regression model');
    }

    return new potential_regression_PotentialRegression(true, json);
  }

}
// EXTERNAL MODULE: ./node_modules/ml-kernel/src/kernel.js
var kernel = __webpack_require__(10);
var kernel_default = /*#__PURE__*/__webpack_require__.n(kernel);

// CONCATENATED MODULE: ./node_modules/ml-regression/src/regression/kernel-ridge-regression.js



const defaultOptions = {
  lambda: 0.1,
  kernelType: 'gaussian',
  kernelOptions: {},
  computeCoefficient: false
}; // Implements the Kernel ridge regression algorithm.
// http://www.ics.uci.edu/~welling/classnotes/papers_class/Kernel-Ridge.pdf

class kernel_ridge_regression_KernelRidgeRegression extends BaseRegression {
  constructor(inputs, outputs, options) {
    super();

    if (inputs === true) {
      // reloading model
      this.alpha = outputs.alpha;
      this.inputs = outputs.inputs;
      this.kernelType = outputs.kernelType;
      this.kernelOptions = outputs.kernelOptions;
      this.kernel = new kernel_default.a(outputs.kernelType, outputs.kernelOptions);
    } else {
      options = Object.assign({}, defaultOptions, options);
      const kernelFunction = new kernel_default.a(options.kernelType, options.kernelOptions);
      const K = kernelFunction.compute(inputs);
      const n = inputs.length;
      K.add(src["Matrix"].eye(n, n).mul(options.lambda));
      this.alpha = Object(src["solve"])(K, outputs);
      this.inputs = inputs;
      this.kernelType = options.kernelType;
      this.kernelOptions = options.kernelOptions;
      this.kernel = kernelFunction;
    }
  }

  _predict(newInputs) {
    return this.kernel.compute([newInputs], this.inputs).mmul(this.alpha)[0];
  }

  toJSON() {
    return {
      name: 'kernelRidgeRegression',
      alpha: this.alpha,
      inputs: this.inputs,
      kernelType: this.kernelType,
      kernelOptions: this.kernelOptions
    };
  }

  static load(json) {
    if (json.name !== 'kernelRidgeRegression') {
      throw new TypeError('not a KRR model');
    }

    return new kernel_ridge_regression_KernelRidgeRegression(true, json);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-regression/src/regression/poly-fit-regression2d.js


const poly_fit_regression2d_defaultOptions = {
  order: 2
}; // Implements the Kernel ridge regression algorithm.
// http://www.ics.uci.edu/~welling/classnotes/papers_class/Kernel-Ridge.pdf

class poly_fit_regression2d_PolynomialFitRegression2D extends BaseRegression {
  /**
   * Constructor for the 2D polynomial fitting
   *
   * @param inputs
   * @param outputs
   * @param options
   * @constructor
   */
  constructor(inputs, outputs, options) {
    super();

    if (inputs === true) {
      // reloading model
      this.coefficients = src["Matrix"].columnVector(outputs.coefficients);
      this.order = outputs.order;

      if (outputs.r) {
        this.r = outputs.r;
        this.r2 = outputs.r2;
      }

      if (outputs.chi2) {
        this.chi2 = outputs.chi2;
      }
    } else {
      options = Object.assign({}, poly_fit_regression2d_defaultOptions, options);
      this.order = options.order;
      this.coefficients = [];
      this.X = inputs;
      this.y = outputs;
      this.train(this.X, this.y, options);
    }
  }
  /**
   * Function that fits the model given the data(X) and predictions(y).
   * The third argument is an object with the following options:
   * * order: order of the polynomial to fit.
   *
   * @param {Matrix} X - A matrix with n rows and 2 columns.
   * @param {Matrix} y - A vector of the prediction values.
   */


  train(X, y) {
    if (!src["Matrix"].isMatrix(X)) X = new src["Matrix"](X);
    if (!src["Matrix"].isMatrix(y)) y = src["Matrix"].columnVector(y);

    if (y.rows !== X.rows) {
      y = y.transpose();
    }

    if (X.columns !== 2) {
      throw new RangeError('You give X with ' + X.columns + ' columns and it must be 2');
    }

    if (X.rows !== y.rows) {
      throw new RangeError('X and y must have the same rows');
    }

    var examples = X.rows;
    var coefficients = (this.order + 2) * (this.order + 1) / 2;
    this.coefficients = new Array(coefficients);
    var x1 = X.getColumnVector(0);
    var x2 = X.getColumnVector(1);
    var scaleX1 = 1.0 / x1.clone().apply(abs).max();
    var scaleX2 = 1.0 / x2.clone().apply(abs).max();
    var scaleY = 1.0 / y.clone().apply(abs).max();
    x1.mulColumn(0, scaleX1);
    x2.mulColumn(0, scaleX2);
    y.mulColumn(0, scaleY);
    var A = new src["Matrix"](examples, coefficients);
    var col = 0;

    for (var i = 0; i <= this.order; ++i) {
      var limit = this.order - i;

      for (var j = 0; j <= limit; ++j) {
        var result = powColVector(x1, i).mulColumnVector(powColVector(x2, j));
        A.setColumn(col, result);
        col++;
      }
    }

    var svd = new src["SVD"](A.transpose(), {
      computeLeftSingularVectors: true,
      computeRightSingularVectors: true,
      autoTranspose: false
    });
    var qqs = src["Matrix"].rowVector(svd.diagonal);
    qqs = qqs.apply(function (i, j) {
      if (this[i][j] >= 1e-15) this[i][j] = 1 / this[i][j];else this[i][j] = 0;
    });
    var qqs1 = src["Matrix"].zeros(examples, coefficients);

    for (i = 0; i < coefficients; ++i) {
      qqs1[i][i] = qqs[0][i];
    }

    qqs = qqs1;
    var U = svd.rightSingularVectors;
    var V = svd.leftSingularVectors;
    this.coefficients = V.mmul(qqs.transpose()).mmul(U.transpose()).mmul(y);
    col = 0;

    for (i = 0; i <= coefficients; ++i) {
      limit = this.order - i;

      for (j = 0; j <= limit; ++j) {
        this.coefficients[col][0] = this.coefficients[col][0] * Math.pow(scaleX1, i) * Math.pow(scaleX2, j) / scaleY;
        col++;
      }
    }
  }

  _predict(newInputs) {
    var x1 = newInputs[0];
    var x2 = newInputs[1];
    var y = 0;
    var column = 0;

    for (var i = 0; i <= this.order; i++) {
      for (var j = 0; j <= this.order - i; j++) {
        y += Math.pow(x1, i) * Math.pow(x2, j) * this.coefficients[column][0];
        column++;
      }
    }

    return y;
  }

  toJSON() {
    return {
      name: 'polyfit2D',
      order: this.order,
      coefficients: this.coefficients
    };
  }

  static load(json) {
    if (json.name !== 'polyfit2D') {
      throw new TypeError('not a polyfit2D model');
    }

    return new poly_fit_regression2d_PolynomialFitRegression2D(true, json);
  }

}
/**
 * Function that given a column vector return this: vector^power
 *
 * @param x - Column vector.
 * @param power - Pow number.
 * @return {Suite|Matrix}
 */

function powColVector(x, power) {
  var result = x.clone();

  for (var i = 0; i < x.rows; ++i) {
    result[i][0] = Math.pow(result[i][0], power);
  }

  return result;
}
/**
 * Function to use in the apply method to get the absolute value
 * of each element of the matrix
 *
 * @param i - current row.
 * @param j - current column.
 */


function abs(i, j) {
  this[i][j] = Math.abs(this[i][j]);
}
// EXTERNAL MODULE: ./node_modules/ml-stat/index.js
var ml_stat = __webpack_require__(3);

// CONCATENATED MODULE: ./node_modules/ml-regression-theil-sen/src/index.js


const median = ml_stat["array"].median;
class src_TheilSenRegression extends BaseRegression {
  /**
   * Theil–Sen estimator
   * https://en.wikipedia.org/wiki/Theil%E2%80%93Sen_estimator
   * @param {Array<number>|boolean} x
   * @param {Array<number>|object} y
   * @constructor
   */
  constructor(x, y) {
    super();

    if (x === true) {
      // loads the model
      this.slope = y.slope;
      this.intercept = y.intercept;
      this.coefficients = y.coefficients;
    } else {
      // creates the model
      checkArraySize(x, y);
      theilSen(this, x, y);
    }
  }

  toJSON() {
    return {
      name: 'TheilSenRegression',
      slope: this.slope,
      intercept: this.intercept
    };
  }

  _predict(input) {
    return this.slope * input + this.intercept;
  }

  computeX(input) {
    return (input - this.intercept) / this.slope;
  }

  toString(precision) {
    var result = 'f(x) = ';

    if (this.slope) {
      var xFactor = maybeToPrecision(this.slope, precision);
      result += (Math.abs(xFactor - 1) < 1e-5 ? '' : xFactor + ' * ') + 'x';

      if (this.intercept) {
        var absIntercept = Math.abs(this.intercept);
        var operator = absIntercept === this.intercept ? '+' : '-';
        result += ' ' + operator + ' ' + maybeToPrecision(absIntercept, precision);
      }
    } else {
      result += maybeToPrecision(this.intercept, precision);
    }

    return result;
  }

  toLaTeX(precision) {
    return this.toString(precision);
  }

  static load(json) {
    if (json.name !== 'TheilSenRegression') {
      throw new TypeError('not a Theil-Sen model');
    }

    return new src_TheilSenRegression(true, json);
  }

}

function theilSen(regression, x, y) {
  let len = x.length;
  let slopes = new Array(len * len);
  let count = 0;

  for (let i = 0; i < len; ++i) {
    for (let j = i + 1; j < len; ++j) {
      if (x[i] !== x[j]) {
        slopes[count++] = (y[j] - y[i]) / (x[j] - x[i]);
      }
    }
  }

  slopes.length = count;
  let medianSlope = median(slopes);
  let cuts = new Array(len);

  for (let i = 0; i < len; ++i) {
    cuts[i] = y[i] - medianSlope * x[i];
  }

  regression.slope = medianSlope;
  regression.intercept = median(cuts);
  regression.coefficients = [regression.intercept, regression.slope];
}
// CONCATENATED MODULE: ./node_modules/ml-regression-robust-polynomial/src/index.js


class src_RobustPolynomialRegression extends BaseRegression {
  constructor(x, y, degree) {
    super();

    if (x === true) {
      this.degree = y.degree;
      this.powers = y.powers;
      this.coefficients = y.coefficients;
    } else {
      checkArraySize(x, y);
      robustPolynomial(this, x, y, degree);
    }
  }

  toJSON() {
    return {
      name: 'robustPolynomialRegression',
      degree: this.degree,
      powers: this.powers,
      coefficients: this.coefficients
    };
  }

  _predict(x) {
    return predict(x, this.powers, this.coefficients);
  }

  toString(precision) {
    return this._toFormula(precision, false);
  }

  toLaTeX(precision) {
    return this._toFormula(precision, true);
  }

  _toFormula(precision, isLaTeX) {
    let sup = '^';
    let closeSup = '';
    let times = ' * ';

    if (isLaTeX) {
      sup = '^{';
      closeSup = '}';
      times = '';
    }

    let fn = '';
    let str = '';

    for (let k = 0; k < this.coefficients.length; k++) {
      str = '';

      if (this.coefficients[k] !== 0) {
        if (this.powers[k] === 0) {
          str = maybeToPrecision(this.coefficients[k], precision);
        } else {
          if (this.powers[k] === 1) {
            str = maybeToPrecision(this.coefficients[k], precision) + times + 'x';
          } else {
            str = maybeToPrecision(this.coefficients[k], precision) + times + 'x' + sup + this.powers[k] + closeSup;
          }
        }

        if (this.coefficients[k] > 0 && k !== this.coefficients.length - 1) {
          str = ' + ' + str;
        } else if (k !== this.coefficients.length - 1) {
          str = ' ' + str;
        }
      }

      fn = str + fn;
    }

    if (fn.charAt(0) === '+') {
      fn = fn.slice(1);
    }

    return 'f(x) = ' + fn;
  }

  static load(json) {
    if (json.name !== 'robustPolynomialRegression') {
      throw new TypeError('not a RobustPolynomialRegression model');
    }

    return new src_RobustPolynomialRegression(true, json);
  }

}

function robustPolynomial(regression, x, y, degree) {
  let powers = new Array(degree);

  for (let k = 0; k < degree; k++) {
    powers[k] = k;
  }

  const tuples = getRandomTuples(x, y, degree);
  var min;

  for (var i = 0; i < tuples.length; i++) {
    var tuple = tuples[i];
    var coefficients = calcCoefficients(tuple, powers);
    var residuals = x.slice();

    for (var j = 0; j < x.length; j++) {
      residuals[j] = y[j] - predict(x[j], powers, coefficients);
      residuals[j] = {
        residual: residuals[j] * residuals[j],
        coefficients
      };
    }

    var median = residualsMedian(residuals);

    if (!min || median.residual < min.residual) {
      min = median;
    }
  }

  regression.degree = degree;
  regression.powers = powers;
  regression.coefficients = min.coefficients;
}
/**
 * @ignore
 * @param {Array<number>} x
 * @param {Array<number>} y
 * @param {number} degree
 * @return {Array<{x:number,y:number}>}
 */


function getRandomTuples(x, y, degree) {
  var len = Math.floor(x.length / degree);
  var tuples = new Array(len);

  for (var i = 0; i < x.length; i++) {
    var pos = Math.floor(Math.random() * len);
    var counter = 0;

    while (counter < x.length) {
      if (!tuples[pos]) {
        tuples[pos] = [{
          x: x[i],
          y: y[i]
        }];
        break;
      } else if (tuples[pos].length < degree) {
        tuples[pos].push({
          x: x[i],
          y: y[i]
        });
        break;
      } else {
        counter++;
        pos = (pos + 1) % len;
      }
    }

    if (counter === x.length) {
      return tuples;
    }
  }

  return tuples;
}
/**
 * @ignore
 * @param {{x:number,y:number}} tuple
 * @param {Array<number>} powers
 * @return {Array<number>}
 */


function calcCoefficients(tuple, powers) {
  var X = tuple.slice();
  var Y = tuple.slice();

  for (var i = 0; i < X.length; i++) {
    Y[i] = [tuple[i].y];
    X[i] = new Array(powers.length);

    for (var j = 0; j < powers.length; j++) {
      X[i][j] = Math.pow(tuple[i].x, powers[j]);
    }
  }

  return Object(src["solve"])(X, Y).to1DArray();
}

function predict(x, powers, coefficients) {
  let y = 0;

  for (let k = 0; k < powers.length; k++) {
    y += coefficients[k] * Math.pow(x, powers[k]);
  }

  return y;
}

function residualsMedian(residuals) {
  residuals.sort((a, b) => a.residual - b.residual);
  var l = residuals.length;
  var half = Math.floor(l / 2);

  if (l % 2 === 0) {
    return residuals[half - 1];
  } else {
    return residuals[half];
  }
}
// CONCATENATED MODULE: ./node_modules/ml-regression/src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NLR", function() { return NLR; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NonLinearRegression", function() { return NLR; });
/* concated harmony reexport SimpleLinearRegression */__webpack_require__.d(__webpack_exports__, "SimpleLinearRegression", function() { return src_SimpleLinearRegression; });
/* concated harmony reexport SLR */__webpack_require__.d(__webpack_exports__, "SLR", function() { return src_SimpleLinearRegression; });
/* concated harmony reexport PolynomialRegression */__webpack_require__.d(__webpack_exports__, "PolynomialRegression", function() { return src_PolynomialRegression; });
/* concated harmony reexport ExponentialRegression */__webpack_require__.d(__webpack_exports__, "ExponentialRegression", function() { return src_ExponentialRegression; });
/* concated harmony reexport PowerRegression */__webpack_require__.d(__webpack_exports__, "PowerRegression", function() { return src_PowerRegression; });
/* concated harmony reexport MultivariateLinearRegression */__webpack_require__.d(__webpack_exports__, "MultivariateLinearRegression", function() { return src_MultivariateLinearRegression; });
/* concated harmony reexport KernelRidgeRegression */__webpack_require__.d(__webpack_exports__, "KernelRidgeRegression", function() { return kernel_ridge_regression_KernelRidgeRegression; });
/* concated harmony reexport KRR */__webpack_require__.d(__webpack_exports__, "KRR", function() { return kernel_ridge_regression_KernelRidgeRegression; });
/* concated harmony reexport PolinomialFitting2D */__webpack_require__.d(__webpack_exports__, "PolinomialFitting2D", function() { return poly_fit_regression2d_PolynomialFitRegression2D; });
/* concated harmony reexport TheilSenRegression */__webpack_require__.d(__webpack_exports__, "TheilSenRegression", function() { return src_TheilSenRegression; });
/* concated harmony reexport RobustPolynomialRegression */__webpack_require__.d(__webpack_exports__, "RobustPolynomialRegression", function() { return src_RobustPolynomialRegression; });






const NLR = {
  PotentialRegression: potential_regression_PotentialRegression
};


 // robust regressions




/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

(function () {
  function a(d) {
    for (var e = 0, f = d.length - 1, g = void 0, h = void 0, i = void 0, j = c(e, f); !0;) {
      if (f <= e) return d[j];
      if (f == e + 1) return d[e] > d[f] && b(d, e, f), d[j];

      for (g = c(e, f), d[g] > d[f] && b(d, g, f), d[e] > d[f] && b(d, e, f), d[g] > d[e] && b(d, g, e), b(d, g, e + 1), h = e + 1, i = f; !0;) {
        do h++; while (d[e] > d[h]);

        do i--; while (d[i] > d[e]);

        if (i < h) break;
        b(d, h, i);
      }

      b(d, e, i), i <= j && (e = h), i >= j && (f = i - 1);
    }
  }

  var b = function b(d, e, f) {
    var _ref;

    return _ref = [d[f], d[e]], d[e] = _ref[0], d[f] = _ref[1], _ref;
  },
      c = function c(d, e) {
    return ~~((d + e) / 2);
  };

   true && module.exports ? module.exports = a : window.median = a;
})();

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const mlCart = __webpack_require__(8);

const mlRandomForest = __webpack_require__(141);

const ML = exports; // Try to keep this list in the same structure as the README.
// Unsupervised learning

ML.PCA = __webpack_require__(44);
ML.HClust = __webpack_require__(45);
ML.KMeans = __webpack_require__(140); // Supervised learning

ML.SVM = __webpack_require__(54);
ML.NaiveBayes = __webpack_require__(143);
ML.KNN = __webpack_require__(147);
ML.PLS = __webpack_require__(144);
ML.CrossValidation = __webpack_require__(65);
ML.ConfusionMatrix = __webpack_require__(25);
ML.DecisionTreeClassifier = mlCart.DecisionTreeClassifier;
ML.RandomForestClassifier = mlRandomForest.RandomForestClassifier; // Artificial neural networks

ML.FNN = __webpack_require__(67);
ML.SOM = __webpack_require__(69); // Regression

const Regression = __webpack_require__(41);

ML.SimpleLinearRegression = Regression.SimpleLinearRegression;
ML.PolynomialRegression = Regression.PolynomialRegression;
ML.MultivariateLinearRegression = Regression.MultivariateLinearRegression;
ML.PowerRegression = Regression.PowerRegression;
ML.ExponentialRegression = Regression.ExponentialRegression;
ML.TheilSenRegression = Regression.TheilSenRegression;
ML.RobustPolynomialRegression = Regression.RobustPolynomialRegression;
ML.DecisionTreeRegression = mlCart.DecisionTreeRegression;
ML.RandomForestRegression = mlRandomForest.RandomForestRegression; // Optimization

ML.levenbergMarquardt = __webpack_require__(145); // Math

const Matrix = __webpack_require__(0);

ML.Matrix = Matrix.Matrix;
ML.SVD = Matrix.SVD;
ML.EVD = Matrix.EVD;
ML.CholeskyDecomposition = Matrix.CholeskyDecomposition;
ML.LuDecomposition = Matrix.LuDecomposition;
ML.QrDecomposition = Matrix.QrDecomposition;
ML.SparseMatrix = __webpack_require__(71);
ML.Kernel = __webpack_require__(10);
ML.Distance = __webpack_require__(30).distance;
ML.Similarity = __webpack_require__(30).similarity;
ML.distanceMatrix = __webpack_require__(24);
ML.XSadd = __webpack_require__(19).default; // Statistics

ML.Performance = __webpack_require__(120); // Data preprocessing

ML.savitzkyGolay = __webpack_require__(122);
ML.savitzkyGolayGeneralized = __webpack_require__(123); // Utility

ML.BitArray = __webpack_require__(124);
ML.HashTable = __webpack_require__(14);
ML.padArray = __webpack_require__(40);
ML.binarySearch = __webpack_require__(6);
ML.numSort = __webpack_require__(7);
ML.Random = __webpack_require__(11).default; // Undocumented/deprecated packages

ML.ArrayUtils = __webpack_require__(126);
ML.Regression = __webpack_require__(41);
ML.MatrixUtil = __webpack_require__(0);
ML.ArrayStat = __webpack_require__(3).array;
ML.MatrixStat = __webpack_require__(3).matrix;
ML.Array = {
  min: __webpack_require__(17).default,
  max: __webpack_require__(9).default,
  median: __webpack_require__(18).default,
  mean: __webpack_require__(5).default,
  mode: __webpack_require__(130).default,
  normed: __webpack_require__(131).default,
  rescale: __webpack_require__(13).default,
  sequentialFill: __webpack_require__(20).default,
  standardDeviation: __webpack_require__(132).default,
  variance: __webpack_require__(21).default
};
ML.ArrayXY = {
  centroidsMerge: __webpack_require__(133).default,
  closestX: __webpack_require__(134).default,
  maxMerge: __webpack_require__(135).default,
  maxY: __webpack_require__(136).default,
  sortX: __webpack_require__(137).default,
  uniqueX: __webpack_require__(138).default,
  weightedMerge: __webpack_require__(139).default,
  equallySpaced: __webpack_require__(142).default,
  filterX: __webpack_require__(146).default
};

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const matrixLib = __webpack_require__(0);

const Matrix = matrixLib.Matrix;
const EVD = matrixLib.EVD;
const SVD = matrixLib.SVD;

const Stat = __webpack_require__(4);

const mean = Stat.mean;
const stdev = Stat.standardDeviation;
const defaultOptions = {
  isCovarianceMatrix: false,
  center: true,
  scale: false
};
/**
 * Creates new PCA (Principal Component Analysis) from the dataset
 * @param {Matrix} dataset - dataset or covariance matrix
 * @param {Object} options
 * @param {boolean} [options.isCovarianceMatrix=false] - true if the dataset is a covariance matrix
 * @param {boolean} [options.center=true] - should the data be centered (subtract the mean)
 * @param {boolean} [options.scale=false] - should the data be scaled (divide by the standard deviation)
 * */

class PCA {
  constructor(dataset, options) {
    if (dataset === true) {
      const model = options;
      this.center = model.center;
      this.scale = model.scale;
      this.means = model.means;
      this.stdevs = model.stdevs;
      this.U = Matrix.checkMatrix(model.U);
      this.S = model.S;
      return;
    }

    options = Object.assign({}, defaultOptions, options);
    this.center = false;
    this.scale = false;
    this.means = null;
    this.stdevs = null;

    if (options.isCovarianceMatrix) {
      // user provided a covariance matrix instead of dataset
      this._computeFromCovarianceMatrix(dataset);

      return;
    }

    var useCovarianceMatrix;

    if (typeof options.useCovarianceMatrix === 'boolean') {
      useCovarianceMatrix = options.useCovarianceMatrix;
    } else {
      useCovarianceMatrix = dataset.length > dataset[0].length;
    }

    if (useCovarianceMatrix) {
      // user provided a dataset but wants us to compute and use the covariance matrix
      dataset = this._adjust(dataset, options);
      const covarianceMatrix = dataset.transposeView().mmul(dataset).div(dataset.rows - 1);

      this._computeFromCovarianceMatrix(covarianceMatrix);
    } else {
      dataset = this._adjust(dataset, options);
      var svd = new SVD(dataset, {
        computeLeftSingularVectors: false,
        computeRightSingularVectors: true,
        autoTranspose: true
      });
      this.U = svd.rightSingularVectors;
      const singularValues = svd.diagonal;
      const eigenvalues = new Array(singularValues.length);

      for (var i = 0; i < singularValues.length; i++) {
        eigenvalues[i] = singularValues[i] * singularValues[i] / (dataset.length - 1);
      }

      this.S = eigenvalues;
    }
  }
  /**
   * Load a PCA model from JSON
   * @param {Object} model
   * @return {PCA}
   */


  static load(model) {
    if (model.name !== 'PCA') throw new RangeError('Invalid model: ' + model.name);
    return new PCA(true, model);
  }
  /**
   * Project the dataset into the PCA space
   * @param {Matrix} dataset
   * @param {Object} options
   * @return {Matrix} dataset projected in the PCA space
   */


  predict(dataset) {
    let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    const {
      nComponents = this.U.columns
    } = options;
    dataset = new Matrix(dataset);

    if (this.center) {
      dataset.subRowVector(this.means);

      if (this.scale) {
        dataset.divRowVector(this.stdevs);
      }
    }

    var predictions = dataset.mmul(this.U);
    return predictions.subMatrix(0, predictions.rows - 1, 0, nComponents - 1);
  }
  /**
   * Returns the proportion of variance for each component
   * @return {[number]}
   */


  getExplainedVariance() {
    var sum = 0;

    for (var i = 0; i < this.S.length; i++) {
      sum += this.S[i];
    }

    return this.S.map(value => value / sum);
  }
  /**
   * Returns the cumulative proportion of variance
   * @return {[number]}
   */


  getCumulativeVariance() {
    var explained = this.getExplainedVariance();

    for (var i = 1; i < explained.length; i++) {
      explained[i] += explained[i - 1];
    }

    return explained;
  }
  /**
   * Returns the Eigenvectors of the covariance matrix
   * @returns {Matrix}
   */


  getEigenvectors() {
    return this.U;
  }
  /**
   * Returns the Eigenvalues (on the diagonal)
   * @returns {[number]}
   */


  getEigenvalues() {
    return this.S;
  }
  /**
   * Returns the standard deviations of the principal components
   * @returns {[number]}
   */


  getStandardDeviations() {
    return this.S.map(x => Math.sqrt(x));
  }
  /**
   * Returns the loadings matrix
   * @return {Matrix}
   */


  getLoadings() {
    return this.U.transpose();
  }
  /**
   * Export the current model to a JSON object
   * @return {Object} model
   */


  toJSON() {
    return {
      name: 'PCA',
      center: this.center,
      scale: this.scale,
      means: this.means,
      stdevs: this.stdevs,
      U: this.U,
      S: this.S
    };
  }

  _adjust(dataset, options) {
    this.center = !!options.center;
    this.scale = !!options.scale;
    dataset = new Matrix(dataset);

    if (this.center) {
      const means = mean(dataset);
      const stdevs = this.scale ? stdev(dataset, means, true) : null;
      this.means = means;
      dataset.subRowVector(means);

      if (this.scale) {
        for (var i = 0; i < stdevs.length; i++) {
          if (stdevs[i] === 0) {
            throw new RangeError('Cannot scale the dataset (standard deviation is zero at index ' + i);
          }
        }

        this.stdevs = stdevs;
        dataset.divRowVector(stdevs);
      }
    }

    return dataset;
  }

  _computeFromCovarianceMatrix(dataset) {
    const evd = new EVD(dataset, {
      assumeSymmetric: true
    });
    this.U = evd.eigenvectorMatrix;

    for (var i = 0; i < this.U.length; i++) {
      this.U[i].reverse();
    }

    this.S = evd.realEigenvalues.reverse();
  }

}

module.exports = PCA;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.agnes = __webpack_require__(46);
exports.diana = __webpack_require__(53); //exports.birch = require('./birch');
//exports.cure = require('./cure');
//exports.chameleon = require('./chameleon');

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const euclidean = __webpack_require__(2);

const ClusterLeaf = __webpack_require__(23);

const Cluster = __webpack_require__(15);

const distanceMatrix = __webpack_require__(24);
/**
 * @private
 * @param cluster1
 * @param cluster2
 * @param disFun
 * @returns {number}
 */


function simpleLink(cluster1, cluster2, disFun) {
  var m = 10e100;

  for (var i = 0; i < cluster1.length; i++) {
    for (var j = 0; j < cluster2.length; j++) {
      var d = disFun[cluster1[i]][cluster2[j]];
      m = Math.min(d, m);
    }
  }

  return m;
}
/**
 * @private
 * @param cluster1
 * @param cluster2
 * @param disFun
 * @returns {number}
 */


function completeLink(cluster1, cluster2, disFun) {
  var m = -1;

  for (var i = 0; i < cluster1.length; i++) {
    for (var j = 0; j < cluster2.length; j++) {
      var d = disFun[cluster1[i]][cluster2[j]];
      m = Math.max(d, m);
    }
  }

  return m;
}
/**
 * @private
 * @param cluster1
 * @param cluster2
 * @param disFun
 * @returns {number}
 */


function averageLink(cluster1, cluster2, disFun) {
  var m = 0;

  for (var i = 0; i < cluster1.length; i++) {
    for (var j = 0; j < cluster2.length; j++) {
      m += disFun[cluster1[i]][cluster2[j]];
    }
  }

  return m / (cluster1.length * cluster2.length);
}
/**
 * @private
 * @param cluster1
 * @param cluster2
 * @param disFun
 * @returns {*}
 */


function centroidLink(cluster1, cluster2, disFun) {
  var dist = new Array(cluster1.length * cluster2.length);

  for (var i = 0; i < cluster1.length; i++) {
    for (var j = 0; j < cluster2.length; j++) {
      dist[i * cluster2.length + j] = disFun[cluster1[i]][cluster2[j]];
    }
  }

  return median(dist);
}
/**
 * @private
 * @param cluster1
 * @param cluster2
 * @param disFun
 * @returns {number}
 */


function wardLink(cluster1, cluster2, disFun) {
  return centroidLink(cluster1, cluster2, disFun) * cluster1.length * cluster2.length / (cluster1.length + cluster2.length);
}

function compareNumbers(a, b) {
  return a - b;
}

function median(values, alreadySorted) {
  if (alreadySorted === undefined) alreadySorted = false;

  if (!alreadySorted) {
    values = [].concat(values).sort(compareNumbers);
  }

  var l = values.length;
  var half = Math.floor(l / 2);

  if (l % 2 === 0) {
    return (values[half - 1] + values[half]) * 0.5;
  } else {
    return values[half];
  }
}

var defaultOptions = {
  disFunc: euclidean,
  kind: 'single',
  isDistanceMatrix: false
};
/**
 * Continuously merge nodes that have the least dissimilarity
 * @param {Array <Array <number>>} distance - Array of points to be clustered
 * @param {json} options
 * @option isDistanceMatrix: Is the input a distance matrix?
 * @constructor
 */

function agnes(data, options) {
  options = Object.assign({}, defaultOptions, options);
  var len = data.length;
  var distance = data; //If source

  if (!options.isDistanceMatrix) {
    distance = distanceMatrix(data, options.disFunc);
  } // allows to use a string or a given function


  if (typeof options.kind === 'string') {
    switch (options.kind) {
      case 'single':
        options.kind = simpleLink;
        break;

      case 'complete':
        options.kind = completeLink;
        break;

      case 'average':
        options.kind = averageLink;
        break;

      case 'centroid':
        options.kind = centroidLink;
        break;

      case 'ward':
        options.kind = wardLink;
        break;

      default:
        throw new RangeError('Unknown kind of similarity');
    }
  } else if (typeof options.kind !== 'function') {
    throw new TypeError('Undefined kind of similarity');
  }

  var list = new Array(len);

  for (var i = 0; i < distance.length; i++) {
    list[i] = new ClusterLeaf(i);
  }

  var min = 10e5,
      d = {},
      dis = 0;

  while (list.length > 1) {
    // calculates the minimum distance
    d = {};
    min = 10e5;

    for (var j = 0; j < list.length; j++) {
      for (var k = j + 1; k < list.length; k++) {
        var fdistance, sdistance;

        if (list[j] instanceof ClusterLeaf) {
          fdistance = [list[j].index];
        } else {
          fdistance = new Array(list[j].index.length);

          for (var e = 0; e < fdistance.length; e++) {
            fdistance[e] = list[j].index[e].index;
          }
        }

        if (list[k] instanceof ClusterLeaf) {
          sdistance = [list[k].index];
        } else {
          sdistance = new Array(list[k].index.length);

          for (var f = 0; f < sdistance.length; f++) {
            sdistance[f] = list[k].index[f].index;
          }
        }

        dis = options.kind(fdistance, sdistance, distance).toFixed(4);

        if (dis in d) {
          d[dis].push([list[j], list[k]]);
        } else {
          d[dis] = [[list[j], list[k]]];
        }

        min = Math.min(dis, min);
      }
    } // cluster dots


    var dmin = d[min.toFixed(4)];
    var clustered = new Array(dmin.length);
    var aux,
        count = 0;

    while (dmin.length > 0) {
      aux = dmin.shift();

      for (var q = 0; q < dmin.length; q++) {
        var int = dmin[q].filter(function (n) {
          //noinspection JSReferencingMutableVariableFromClosure
          return aux.indexOf(n) !== -1;
        });

        if (int.length > 0) {
          var diff = dmin[q].filter(function (n) {
            //noinspection JSReferencingMutableVariableFromClosure
            return aux.indexOf(n) === -1;
          });
          aux = aux.concat(diff);
          dmin.splice(q--, 1);
        }
      }

      clustered[count++] = aux;
    }

    clustered.length = count;

    for (var ii = 0; ii < clustered.length; ii++) {
      var obj = new Cluster();
      obj.children = clustered[ii].concat();
      obj.distance = min;
      obj.index = new Array(len);
      var indCount = 0;

      for (var jj = 0; jj < clustered[ii].length; jj++) {
        if (clustered[ii][jj] instanceof ClusterLeaf) {
          obj.index[indCount++] = clustered[ii][jj];
        } else {
          indCount += clustered[ii][jj].index.length;
          obj.index = clustered[ii][jj].index.concat(obj.index);
        }

        list.splice(list.indexOf(clustered[ii][jj]), 1);
      }

      obj.index.length = indCount;
      list.push(obj);
    }
  }

  return list[0];
}

module.exports = agnes;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(48);

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// Generated by CoffeeScript 1.8.0
(function () {
  var Heap, defaultCmp, floor, heapify, heappop, heappush, heappushpop, heapreplace, insort, min, nlargest, nsmallest, updateItem, _siftdown, _siftup;

  floor = Math.floor, min = Math.min;
  /*
  Default comparison function to be used
   */

  defaultCmp = function defaultCmp(x, y) {
    if (x < y) {
      return -1;
    }

    if (x > y) {
      return 1;
    }

    return 0;
  };
  /*
  Insert item x in list a, and keep it sorted assuming a is sorted.
  
  If x is already in a, insert it to the right of the rightmost x.
  
  Optional args lo (default 0) and hi (default a.length) bound the slice
  of a to be searched.
   */


  insort = function insort(a, x, lo, hi, cmp) {
    var mid;

    if (lo == null) {
      lo = 0;
    }

    if (cmp == null) {
      cmp = defaultCmp;
    }

    if (lo < 0) {
      throw new Error('lo must be non-negative');
    }

    if (hi == null) {
      hi = a.length;
    }

    while (lo < hi) {
      mid = floor((lo + hi) / 2);

      if (cmp(x, a[mid]) < 0) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }

    return [].splice.apply(a, [lo, lo - lo].concat(x)), x;
  };
  /*
  Push item onto heap, maintaining the heap invariant.
   */


  heappush = function heappush(array, item, cmp) {
    if (cmp == null) {
      cmp = defaultCmp;
    }

    array.push(item);
    return _siftdown(array, 0, array.length - 1, cmp);
  };
  /*
  Pop the smallest item off the heap, maintaining the heap invariant.
   */


  heappop = function heappop(array, cmp) {
    var lastelt, returnitem;

    if (cmp == null) {
      cmp = defaultCmp;
    }

    lastelt = array.pop();

    if (array.length) {
      returnitem = array[0];
      array[0] = lastelt;

      _siftup(array, 0, cmp);
    } else {
      returnitem = lastelt;
    }

    return returnitem;
  };
  /*
  Pop and return the current smallest value, and add the new item.
  
  This is more efficient than heappop() followed by heappush(), and can be
  more appropriate when using a fixed size heap. Note that the value
  returned may be larger than item! That constrains reasonable use of
  this routine unless written as part of a conditional replacement:
      if item > array[0]
        item = heapreplace(array, item)
   */


  heapreplace = function heapreplace(array, item, cmp) {
    var returnitem;

    if (cmp == null) {
      cmp = defaultCmp;
    }

    returnitem = array[0];
    array[0] = item;

    _siftup(array, 0, cmp);

    return returnitem;
  };
  /*
  Fast version of a heappush followed by a heappop.
   */


  heappushpop = function heappushpop(array, item, cmp) {
    var _ref;

    if (cmp == null) {
      cmp = defaultCmp;
    }

    if (array.length && cmp(array[0], item) < 0) {
      _ref = [array[0], item], item = _ref[0], array[0] = _ref[1];

      _siftup(array, 0, cmp);
    }

    return item;
  };
  /*
  Transform list into a heap, in-place, in O(array.length) time.
   */


  heapify = function heapify(array, cmp) {
    var i, _i, _j, _len, _ref, _ref1, _results, _results1;

    if (cmp == null) {
      cmp = defaultCmp;
    }

    _ref1 = function () {
      _results1 = [];

      for (var _j = 0, _ref = floor(array.length / 2); 0 <= _ref ? _j < _ref : _j > _ref; 0 <= _ref ? _j++ : _j--) {
        _results1.push(_j);
      }

      return _results1;
    }.apply(this).reverse();

    _results = [];

    for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
      i = _ref1[_i];

      _results.push(_siftup(array, i, cmp));
    }

    return _results;
  };
  /*
  Update the position of the given item in the heap.
  This function should be called every time the item is being modified.
   */


  updateItem = function updateItem(array, item, cmp) {
    var pos;

    if (cmp == null) {
      cmp = defaultCmp;
    }

    pos = array.indexOf(item);

    if (pos === -1) {
      return;
    }

    _siftdown(array, 0, pos, cmp);

    return _siftup(array, pos, cmp);
  };
  /*
  Find the n largest elements in a dataset.
   */


  nlargest = function nlargest(array, n, cmp) {
    var elem, result, _i, _len, _ref;

    if (cmp == null) {
      cmp = defaultCmp;
    }

    result = array.slice(0, n);

    if (!result.length) {
      return result;
    }

    heapify(result, cmp);
    _ref = array.slice(n);

    for (_i = 0, _len = _ref.length; _i < _len; _i++) {
      elem = _ref[_i];
      heappushpop(result, elem, cmp);
    }

    return result.sort(cmp).reverse();
  };
  /*
  Find the n smallest elements in a dataset.
   */


  nsmallest = function nsmallest(array, n, cmp) {
    var elem, i, los, result, _i, _j, _len, _ref, _ref1, _results;

    if (cmp == null) {
      cmp = defaultCmp;
    }

    if (n * 10 <= array.length) {
      result = array.slice(0, n).sort(cmp);

      if (!result.length) {
        return result;
      }

      los = result[result.length - 1];
      _ref = array.slice(n);

      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        elem = _ref[_i];

        if (cmp(elem, los) < 0) {
          insort(result, elem, 0, null, cmp);
          result.pop();
          los = result[result.length - 1];
        }
      }

      return result;
    }

    heapify(array, cmp);
    _results = [];

    for (i = _j = 0, _ref1 = min(n, array.length); 0 <= _ref1 ? _j < _ref1 : _j > _ref1; i = 0 <= _ref1 ? ++_j : --_j) {
      _results.push(heappop(array, cmp));
    }

    return _results;
  };

  _siftdown = function _siftdown(array, startpos, pos, cmp) {
    var newitem, parent, parentpos;

    if (cmp == null) {
      cmp = defaultCmp;
    }

    newitem = array[pos];

    while (pos > startpos) {
      parentpos = pos - 1 >> 1;
      parent = array[parentpos];

      if (cmp(newitem, parent) < 0) {
        array[pos] = parent;
        pos = parentpos;
        continue;
      }

      break;
    }

    return array[pos] = newitem;
  };

  _siftup = function _siftup(array, pos, cmp) {
    var childpos, endpos, newitem, rightpos, startpos;

    if (cmp == null) {
      cmp = defaultCmp;
    }

    endpos = array.length;
    startpos = pos;
    newitem = array[pos];
    childpos = 2 * pos + 1;

    while (childpos < endpos) {
      rightpos = childpos + 1;

      if (rightpos < endpos && !(cmp(array[childpos], array[rightpos]) < 0)) {
        childpos = rightpos;
      }

      array[pos] = array[childpos];
      pos = childpos;
      childpos = 2 * pos + 1;
    }

    array[pos] = newitem;
    return _siftdown(array, startpos, pos, cmp);
  };

  Heap = function () {
    Heap.push = heappush;
    Heap.pop = heappop;
    Heap.replace = heapreplace;
    Heap.pushpop = heappushpop;
    Heap.heapify = heapify;
    Heap.updateItem = updateItem;
    Heap.nlargest = nlargest;
    Heap.nsmallest = nsmallest;

    function Heap(cmp) {
      this.cmp = cmp != null ? cmp : defaultCmp;
      this.nodes = [];
    }

    Heap.prototype.push = function (x) {
      return heappush(this.nodes, x, this.cmp);
    };

    Heap.prototype.pop = function () {
      return heappop(this.nodes, this.cmp);
    };

    Heap.prototype.peek = function () {
      return this.nodes[0];
    };

    Heap.prototype.contains = function (x) {
      return this.nodes.indexOf(x) !== -1;
    };

    Heap.prototype.replace = function (x) {
      return heapreplace(this.nodes, x, this.cmp);
    };

    Heap.prototype.pushpop = function (x) {
      return heappushpop(this.nodes, x, this.cmp);
    };

    Heap.prototype.heapify = function () {
      return heapify(this.nodes, this.cmp);
    };

    Heap.prototype.updateItem = function (x) {
      return updateItem(this.nodes, x, this.cmp);
    };

    Heap.prototype.clear = function () {
      return this.nodes = [];
    };

    Heap.prototype.empty = function () {
      return this.nodes.length === 0;
    };

    Heap.prototype.size = function () {
      return this.nodes.length;
    };

    Heap.prototype.clone = function () {
      var heap;
      heap = new Heap();
      heap.nodes = this.nodes.slice(0);
      return heap;
    };

    Heap.prototype.toArray = function () {
      return this.nodes.slice(0);
    };

    Heap.prototype.insert = Heap.prototype.push;
    Heap.prototype.top = Heap.prototype.peek;
    Heap.prototype.front = Heap.prototype.peek;
    Heap.prototype.has = Heap.prototype.contains;
    Heap.prototype.copy = Heap.prototype.clone;
    return Heap;
  }();

  (function (root, factory) {
    if (true) {
      return !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
    } else {}
  })(this, function () {
    return Heap;
  });
}).call(this);

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process) {// Copyright Joyent, Inc. and other Node contributors.
//
// Permission is hereby granted, free of charge, to any person obtaining a
// copy of this software and associated documentation files (the
// "Software"), to deal in the Software without restriction, including
// without limitation the rights to use, copy, modify, merge, publish,
// distribute, sublicense, and/or sell copies of the Software, and to permit
// persons to whom the Software is furnished to do so, subject to the
// following conditions:
//
// The above copyright notice and this permission notice shall be included
// in all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS
// OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
// MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN
// NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM,
// DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR
// OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE
// USE OR OTHER DEALINGS IN THE SOFTWARE.
var getOwnPropertyDescriptors = Object.getOwnPropertyDescriptors || function getOwnPropertyDescriptors(obj) {
  var keys = Object.keys(obj);
  var descriptors = {};

  for (var i = 0; i < keys.length; i++) {
    descriptors[keys[i]] = Object.getOwnPropertyDescriptor(obj, keys[i]);
  }

  return descriptors;
};

var formatRegExp = /%[sdj%]/g;

exports.format = function (f) {
  if (!isString(f)) {
    var objects = [];

    for (var i = 0; i < arguments.length; i++) {
      objects.push(inspect(arguments[i]));
    }

    return objects.join(' ');
  }

  var i = 1;
  var args = arguments;
  var len = args.length;
  var str = String(f).replace(formatRegExp, function (x) {
    if (x === '%%') return '%';
    if (i >= len) return x;

    switch (x) {
      case '%s':
        return String(args[i++]);

      case '%d':
        return Number(args[i++]);

      case '%j':
        try {
          return JSON.stringify(args[i++]);
        } catch (_) {
          return '[Circular]';
        }

      default:
        return x;
    }
  });

  for (var x = args[i]; i < len; x = args[++i]) {
    if (isNull(x) || !isObject(x)) {
      str += ' ' + x;
    } else {
      str += ' ' + inspect(x);
    }
  }

  return str;
}; // Mark that a method should not be used.
// Returns a modified function which warns once by default.
// If --no-deprecation is set, then it is a no-op.


exports.deprecate = function (fn, msg) {
  if (typeof process !== 'undefined' && process.noDeprecation === true) {
    return fn;
  } // Allow for deprecating things in the process of starting up.


  if (typeof process === 'undefined') {
    return function () {
      return exports.deprecate(fn, msg).apply(this, arguments);
    };
  }

  var warned = false;

  function deprecated() {
    if (!warned) {
      if (process.throwDeprecation) {
        throw new Error(msg);
      } else if (process.traceDeprecation) {
        console.trace(msg);
      } else {
        console.error(msg);
      }

      warned = true;
    }

    return fn.apply(this, arguments);
  }

  return deprecated;
};

var debugs = {};
var debugEnviron;

exports.debuglog = function (set) {
  if (isUndefined(debugEnviron)) debugEnviron = process.env.NODE_DEBUG || '';
  set = set.toUpperCase();

  if (!debugs[set]) {
    if (new RegExp('\\b' + set + '\\b', 'i').test(debugEnviron)) {
      var pid = process.pid;

      debugs[set] = function () {
        var msg = exports.format.apply(exports, arguments);
        console.error('%s %d: %s', set, pid, msg);
      };
    } else {
      debugs[set] = function () {};
    }
  }

  return debugs[set];
};
/**
 * Echos the value of a value. Trys to print the value out
 * in the best way possible given the different types.
 *
 * @param {Object} obj The object to print out.
 * @param {Object} opts Optional options object that alters the output.
 */

/* legacy: obj, showHidden, depth, colors*/


function inspect(obj, opts) {
  // default options
  var ctx = {
    seen: [],
    stylize: stylizeNoColor
  }; // legacy...

  if (arguments.length >= 3) ctx.depth = arguments[2];
  if (arguments.length >= 4) ctx.colors = arguments[3];

  if (isBoolean(opts)) {
    // legacy...
    ctx.showHidden = opts;
  } else if (opts) {
    // got an "options" object
    exports._extend(ctx, opts);
  } // set default options


  if (isUndefined(ctx.showHidden)) ctx.showHidden = false;
  if (isUndefined(ctx.depth)) ctx.depth = 2;
  if (isUndefined(ctx.colors)) ctx.colors = false;
  if (isUndefined(ctx.customInspect)) ctx.customInspect = true;
  if (ctx.colors) ctx.stylize = stylizeWithColor;
  return formatValue(ctx, obj, ctx.depth);
}

exports.inspect = inspect; // http://en.wikipedia.org/wiki/ANSI_escape_code#graphics

inspect.colors = {
  'bold': [1, 22],
  'italic': [3, 23],
  'underline': [4, 24],
  'inverse': [7, 27],
  'white': [37, 39],
  'grey': [90, 39],
  'black': [30, 39],
  'blue': [34, 39],
  'cyan': [36, 39],
  'green': [32, 39],
  'magenta': [35, 39],
  'red': [31, 39],
  'yellow': [33, 39]
}; // Don't use 'blue' not visible on cmd.exe

inspect.styles = {
  'special': 'cyan',
  'number': 'yellow',
  'boolean': 'yellow',
  'undefined': 'grey',
  'null': 'bold',
  'string': 'green',
  'date': 'magenta',
  // "name": intentionally not styling
  'regexp': 'red'
};

function stylizeWithColor(str, styleType) {
  var style = inspect.styles[styleType];

  if (style) {
    return '\u001b[' + inspect.colors[style][0] + 'm' + str + '\u001b[' + inspect.colors[style][1] + 'm';
  } else {
    return str;
  }
}

function stylizeNoColor(str, styleType) {
  return str;
}

function arrayToHash(array) {
  var hash = {};
  array.forEach(function (val, idx) {
    hash[val] = true;
  });
  return hash;
}

function formatValue(ctx, value, recurseTimes) {
  // Provide a hook for user-specified inspect functions.
  // Check that value is an object with an inspect function on it
  if (ctx.customInspect && value && isFunction(value.inspect) && // Filter out the util module, it's inspect function is special
  value.inspect !== exports.inspect && // Also filter out any prototype objects using the circular check.
  !(value.constructor && value.constructor.prototype === value)) {
    var ret = value.inspect(recurseTimes, ctx);

    if (!isString(ret)) {
      ret = formatValue(ctx, ret, recurseTimes);
    }

    return ret;
  } // Primitive types cannot have properties


  var primitive = formatPrimitive(ctx, value);

  if (primitive) {
    return primitive;
  } // Look up the keys of the object.


  var keys = Object.keys(value);
  var visibleKeys = arrayToHash(keys);

  if (ctx.showHidden) {
    keys = Object.getOwnPropertyNames(value);
  } // IE doesn't make error fields non-enumerable
  // http://msdn.microsoft.com/en-us/library/ie/dww52sbt(v=vs.94).aspx


  if (isError(value) && (keys.indexOf('message') >= 0 || keys.indexOf('description') >= 0)) {
    return formatError(value);
  } // Some type of object without properties can be shortcutted.


  if (keys.length === 0) {
    if (isFunction(value)) {
      var name = value.name ? ': ' + value.name : '';
      return ctx.stylize('[Function' + name + ']', 'special');
    }

    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    }

    if (isDate(value)) {
      return ctx.stylize(Date.prototype.toString.call(value), 'date');
    }

    if (isError(value)) {
      return formatError(value);
    }
  }

  var base = '',
      array = false,
      braces = ['{', '}']; // Make Array say that they are Array

  if (isArray(value)) {
    array = true;
    braces = ['[', ']'];
  } // Make functions say that they are functions


  if (isFunction(value)) {
    var n = value.name ? ': ' + value.name : '';
    base = ' [Function' + n + ']';
  } // Make RegExps say that they are RegExps


  if (isRegExp(value)) {
    base = ' ' + RegExp.prototype.toString.call(value);
  } // Make dates with properties first say the date


  if (isDate(value)) {
    base = ' ' + Date.prototype.toUTCString.call(value);
  } // Make error with message first say the error


  if (isError(value)) {
    base = ' ' + formatError(value);
  }

  if (keys.length === 0 && (!array || value.length == 0)) {
    return braces[0] + base + braces[1];
  }

  if (recurseTimes < 0) {
    if (isRegExp(value)) {
      return ctx.stylize(RegExp.prototype.toString.call(value), 'regexp');
    } else {
      return ctx.stylize('[Object]', 'special');
    }
  }

  ctx.seen.push(value);
  var output;

  if (array) {
    output = formatArray(ctx, value, recurseTimes, visibleKeys, keys);
  } else {
    output = keys.map(function (key) {
      return formatProperty(ctx, value, recurseTimes, visibleKeys, key, array);
    });
  }

  ctx.seen.pop();
  return reduceToSingleString(output, base, braces);
}

function formatPrimitive(ctx, value) {
  if (isUndefined(value)) return ctx.stylize('undefined', 'undefined');

  if (isString(value)) {
    var simple = '\'' + JSON.stringify(value).replace(/^"|"$/g, '').replace(/'/g, "\\'").replace(/\\"/g, '"') + '\'';
    return ctx.stylize(simple, 'string');
  }

  if (isNumber(value)) return ctx.stylize('' + value, 'number');
  if (isBoolean(value)) return ctx.stylize('' + value, 'boolean'); // For some reason typeof null is "object", so special case here.

  if (isNull(value)) return ctx.stylize('null', 'null');
}

function formatError(value) {
  return '[' + Error.prototype.toString.call(value) + ']';
}

function formatArray(ctx, value, recurseTimes, visibleKeys, keys) {
  var output = [];

  for (var i = 0, l = value.length; i < l; ++i) {
    if (hasOwnProperty(value, String(i))) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, String(i), true));
    } else {
      output.push('');
    }
  }

  keys.forEach(function (key) {
    if (!key.match(/^\d+$/)) {
      output.push(formatProperty(ctx, value, recurseTimes, visibleKeys, key, true));
    }
  });
  return output;
}

function formatProperty(ctx, value, recurseTimes, visibleKeys, key, array) {
  var name, str, desc;
  desc = Object.getOwnPropertyDescriptor(value, key) || {
    value: value[key]
  };

  if (desc.get) {
    if (desc.set) {
      str = ctx.stylize('[Getter/Setter]', 'special');
    } else {
      str = ctx.stylize('[Getter]', 'special');
    }
  } else {
    if (desc.set) {
      str = ctx.stylize('[Setter]', 'special');
    }
  }

  if (!hasOwnProperty(visibleKeys, key)) {
    name = '[' + key + ']';
  }

  if (!str) {
    if (ctx.seen.indexOf(desc.value) < 0) {
      if (isNull(recurseTimes)) {
        str = formatValue(ctx, desc.value, null);
      } else {
        str = formatValue(ctx, desc.value, recurseTimes - 1);
      }

      if (str.indexOf('\n') > -1) {
        if (array) {
          str = str.split('\n').map(function (line) {
            return '  ' + line;
          }).join('\n').substr(2);
        } else {
          str = '\n' + str.split('\n').map(function (line) {
            return '   ' + line;
          }).join('\n');
        }
      }
    } else {
      str = ctx.stylize('[Circular]', 'special');
    }
  }

  if (isUndefined(name)) {
    if (array && key.match(/^\d+$/)) {
      return str;
    }

    name = JSON.stringify('' + key);

    if (name.match(/^"([a-zA-Z_][a-zA-Z_0-9]*)"$/)) {
      name = name.substr(1, name.length - 2);
      name = ctx.stylize(name, 'name');
    } else {
      name = name.replace(/'/g, "\\'").replace(/\\"/g, '"').replace(/(^"|"$)/g, "'");
      name = ctx.stylize(name, 'string');
    }
  }

  return name + ': ' + str;
}

function reduceToSingleString(output, base, braces) {
  var numLinesEst = 0;
  var length = output.reduce(function (prev, cur) {
    numLinesEst++;
    if (cur.indexOf('\n') >= 0) numLinesEst++;
    return prev + cur.replace(/\u001b\[\d\d?m/g, '').length + 1;
  }, 0);

  if (length > 60) {
    return braces[0] + (base === '' ? '' : base + '\n ') + ' ' + output.join(',\n  ') + ' ' + braces[1];
  }

  return braces[0] + base + ' ' + output.join(', ') + ' ' + braces[1];
} // NOTE: These type checking functions intentionally don't use `instanceof`
// because it is fragile and can be easily faked with `Object.create()`.


function isArray(ar) {
  return Array.isArray(ar);
}

exports.isArray = isArray;

function isBoolean(arg) {
  return typeof arg === 'boolean';
}

exports.isBoolean = isBoolean;

function isNull(arg) {
  return arg === null;
}

exports.isNull = isNull;

function isNullOrUndefined(arg) {
  return arg == null;
}

exports.isNullOrUndefined = isNullOrUndefined;

function isNumber(arg) {
  return typeof arg === 'number';
}

exports.isNumber = isNumber;

function isString(arg) {
  return typeof arg === 'string';
}

exports.isString = isString;

function isSymbol(arg) {
  return typeof arg === 'symbol';
}

exports.isSymbol = isSymbol;

function isUndefined(arg) {
  return arg === void 0;
}

exports.isUndefined = isUndefined;

function isRegExp(re) {
  return isObject(re) && objectToString(re) === '[object RegExp]';
}

exports.isRegExp = isRegExp;

function isObject(arg) {
  return typeof arg === 'object' && arg !== null;
}

exports.isObject = isObject;

function isDate(d) {
  return isObject(d) && objectToString(d) === '[object Date]';
}

exports.isDate = isDate;

function isError(e) {
  return isObject(e) && (objectToString(e) === '[object Error]' || e instanceof Error);
}

exports.isError = isError;

function isFunction(arg) {
  return typeof arg === 'function';
}

exports.isFunction = isFunction;

function isPrimitive(arg) {
  return arg === null || typeof arg === 'boolean' || typeof arg === 'number' || typeof arg === 'string' || typeof arg === 'symbol' || // ES6 symbol
  typeof arg === 'undefined';
}

exports.isPrimitive = isPrimitive;
exports.isBuffer = __webpack_require__(51);

function objectToString(o) {
  return Object.prototype.toString.call(o);
}

function pad(n) {
  return n < 10 ? '0' + n.toString(10) : n.toString(10);
}

var months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']; // 26 Feb 16:19:34

function timestamp() {
  var d = new Date();
  var time = [pad(d.getHours()), pad(d.getMinutes()), pad(d.getSeconds())].join(':');
  return [d.getDate(), months[d.getMonth()], time].join(' ');
} // log is just a thin wrapper to console.log that prepends a timestamp


exports.log = function () {
  console.log('%s - %s', timestamp(), exports.format.apply(exports, arguments));
};
/**
 * Inherit the prototype methods from one constructor into another.
 *
 * The Function.prototype.inherits from lang.js rewritten as a standalone
 * function (not on Function.prototype). NOTE: If this file is to be loaded
 * during bootstrapping this function needs to be rewritten using some native
 * functions as prototype setup using normal JavaScript does not work as
 * expected during bootstrapping (see mirror.js in r114903).
 *
 * @param {function} ctor Constructor function which needs to inherit the
 *     prototype.
 * @param {function} superCtor Constructor function to inherit prototype from.
 */


exports.inherits = __webpack_require__(52);

exports._extend = function (origin, add) {
  // Don't do anything if add isn't an object
  if (!add || !isObject(add)) return origin;
  var keys = Object.keys(add);
  var i = keys.length;

  while (i--) {
    origin[keys[i]] = add[keys[i]];
  }

  return origin;
};

function hasOwnProperty(obj, prop) {
  return Object.prototype.hasOwnProperty.call(obj, prop);
}

var kCustomPromisifiedSymbol = typeof Symbol !== 'undefined' ? Symbol('util.promisify.custom') : undefined;

exports.promisify = function promisify(original) {
  if (typeof original !== 'function') throw new TypeError('The "original" argument must be of type Function');

  if (kCustomPromisifiedSymbol && original[kCustomPromisifiedSymbol]) {
    var fn = original[kCustomPromisifiedSymbol];

    if (typeof fn !== 'function') {
      throw new TypeError('The "util.promisify.custom" argument must be of type Function');
    }

    Object.defineProperty(fn, kCustomPromisifiedSymbol, {
      value: fn,
      enumerable: false,
      writable: false,
      configurable: true
    });
    return fn;
  }

  function fn() {
    var promiseResolve, promiseReject;
    var promise = new Promise(function (resolve, reject) {
      promiseResolve = resolve;
      promiseReject = reject;
    });
    var args = [];

    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    args.push(function (err, value) {
      if (err) {
        promiseReject(err);
      } else {
        promiseResolve(value);
      }
    });

    try {
      original.apply(this, args);
    } catch (err) {
      promiseReject(err);
    }

    return promise;
  }

  Object.setPrototypeOf(fn, Object.getPrototypeOf(original));
  if (kCustomPromisifiedSymbol) Object.defineProperty(fn, kCustomPromisifiedSymbol, {
    value: fn,
    enumerable: false,
    writable: false,
    configurable: true
  });
  return Object.defineProperties(fn, getOwnPropertyDescriptors(original));
};

exports.promisify.custom = kCustomPromisifiedSymbol;

function callbackifyOnRejected(reason, cb) {
  // `!reason` guard inspired by bluebird (Ref: https://goo.gl/t5IS6M).
  // Because `null` is a special error value in callbacks which means "no error
  // occurred", we error-wrap so the callback consumer can distinguish between
  // "the promise rejected with null" or "the promise fulfilled with undefined".
  if (!reason) {
    var newReason = new Error('Promise was rejected with a falsy value');
    newReason.reason = reason;
    reason = newReason;
  }

  return cb(reason);
}

function callbackify(original) {
  if (typeof original !== 'function') {
    throw new TypeError('The "original" argument must be of type Function');
  } // We DO NOT return the promise as it gives the user a false sense that
  // the promise is actually somehow related to the callback's execution
  // and that the callback throwing will reject the promise.


  function callbackified() {
    var args = [];

    for (var i = 0; i < arguments.length; i++) {
      args.push(arguments[i]);
    }

    var maybeCb = args.pop();

    if (typeof maybeCb !== 'function') {
      throw new TypeError('The last argument must be of type Function');
    }

    var self = this;

    var cb = function cb() {
      return maybeCb.apply(self, arguments);
    }; // In true node style we process the callback on `nextTick` with all the
    // implications (stack, `uncaughtException`, `async_hooks`)


    original.apply(this, args).then(function (ret) {
      process.nextTick(cb, null, ret);
    }, function (rej) {
      process.nextTick(callbackifyOnRejected, rej, cb);
    });
  }

  Object.setPrototypeOf(callbackified, Object.getPrototypeOf(original));
  Object.defineProperties(callbackified, getOwnPropertyDescriptors(original));
  return callbackified;
}

exports.callbackify = callbackify;
/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(50)))

/***/ }),
/* 50 */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};

/***/ }),
/* 51 */
/***/ (function(module, exports) {

module.exports = function isBuffer(arg) {
  return arg && typeof arg === 'object' && typeof arg.copy === 'function' && typeof arg.fill === 'function' && typeof arg.readUInt8 === 'function';
};

/***/ }),
/* 52 */
/***/ (function(module, exports) {

if (typeof Object.create === 'function') {
  // implementation from standard node.js 'util' module
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;
    ctor.prototype = Object.create(superCtor.prototype, {
      constructor: {
        value: ctor,
        enumerable: false,
        writable: true,
        configurable: true
      }
    });
  };
} else {
  // old school shim for old browsers
  module.exports = function inherits(ctor, superCtor) {
    ctor.super_ = superCtor;

    var TempCtor = function TempCtor() {};

    TempCtor.prototype = superCtor.prototype;
    ctor.prototype = new TempCtor();
    ctor.prototype.constructor = ctor;
  };
}

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const euclidean = __webpack_require__(2);

const ClusterLeaf = __webpack_require__(23);

const Cluster = __webpack_require__(15);
/**
 * @private
 * @param {Array <Array <number>>} cluster1
 * @param {Array <Array <number>>} cluster2
 * @param {function} disFun
 * @returns {number}
 */


function simpleLink(cluster1, cluster2, disFun) {
  var m = 10e100;

  for (var i = 0; i < cluster1.length; i++) {
    for (var j = i; j < cluster2.length; j++) {
      var d = disFun(cluster1[i], cluster2[j]);
      m = Math.min(d, m);
    }
  }

  return m;
}
/**
 * @private
 * @param {Array <Array <number>>} cluster1
 * @param {Array <Array <number>>} cluster2
 * @param {function} disFun
 * @returns {number}
 */


function completeLink(cluster1, cluster2, disFun) {
  var m = -1;

  for (var i = 0; i < cluster1.length; i++) {
    for (var j = i; j < cluster2.length; j++) {
      var d = disFun(cluster1[i], cluster2[j]);
      m = Math.max(d, m);
    }
  }

  return m;
}
/**
 * @private
 * @param {Array <Array <number>>} cluster1
 * @param {Array <Array <number>>} cluster2
 * @param {function} disFun
 * @returns {number}
 */


function averageLink(cluster1, cluster2, disFun) {
  var m = 0;

  for (var i = 0; i < cluster1.length; i++) {
    for (var j = 0; j < cluster2.length; j++) {
      m += disFun(cluster1[i], cluster2[j]);
    }
  }

  return m / (cluster1.length * cluster2.length);
}
/**
 * @private
 * @param {Array <Array <number>>} cluster1
 * @param {Array <Array <number>>} cluster2
 * @param {function} disFun
 * @returns {number}
 */


function centroidLink(cluster1, cluster2, disFun) {
  var x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0;

  for (var i = 0; i < cluster1.length; i++) {
    x1 += cluster1[i][0];
    y1 += cluster1[i][1];
  }

  for (var j = 0; j < cluster2.length; j++) {
    x2 += cluster2[j][0];
    y2 += cluster2[j][1];
  }

  x1 /= cluster1.length;
  y1 /= cluster1.length;
  x2 /= cluster2.length;
  y2 /= cluster2.length;
  return disFun([x1, y1], [x2, y2]);
}
/**
 * @private
 * @param {Array <Array <number>>} cluster1
 * @param {Array <Array <number>>} cluster2
 * @param {function} disFun
 * @returns {number}
 */


function wardLink(cluster1, cluster2, disFun) {
  var x1 = 0,
      y1 = 0,
      x2 = 0,
      y2 = 0;

  for (var i = 0; i < cluster1.length; i++) {
    x1 += cluster1[i][0];
    y1 += cluster1[i][1];
  }

  for (var j = 0; j < cluster2.length; j++) {
    x2 += cluster2[j][0];
    y2 += cluster2[j][1];
  }

  x1 /= cluster1.length;
  y1 /= cluster1.length;
  x2 /= cluster2.length;
  y2 /= cluster2.length;
  return disFun([x1, y1], [x2, y2]) * cluster1.length * cluster2.length / (cluster1.length + cluster2.length);
}
/**
 * @private
 * Returns the most distant point and his distance
 * @param {Array <Array <number>>} splitting - Clusters to split
 * @param {Array <Array <number>>} data - Original data
 * @param {function} disFun - Distance function
 * @returns {{d: number, p: number}} - d: maximum difference between points, p: the point more distant
 */


function diff(splitting, data, disFun) {
  var ans = {
    d: 0,
    p: 0
  };
  var Ci = new Array(splitting[0].length);

  for (var e = 0; e < splitting[0].length; e++) {
    Ci[e] = data[splitting[0][e]];
  }

  var Cj = new Array(splitting[1].length);

  for (var f = 0; f < splitting[1].length; f++) {
    Cj[f] = data[splitting[1][f]];
  }

  var dist, ndist;

  for (var i = 0; i < Ci.length; i++) {
    dist = 0;

    for (var j = 0; j < Ci.length; j++) {
      if (i !== j) {
        dist += disFun(Ci[i], Ci[j]);
      }
    }

    dist /= Ci.length - 1;
    ndist = 0;

    for (var k = 0; k < Cj.length; k++) {
      ndist += disFun(Ci[i], Cj[k]);
    }

    ndist /= Cj.length;

    if (dist - ndist > ans.d) {
      ans.d = dist - ndist;
      ans.p = i;
    }
  }

  return ans;
}

var defaultOptions = {
  dist: euclidean,
  kind: 'single'
};
/**
 * @private
 * Intra-cluster distance
 * @param {Array} index
 * @param {Array} data
 * @param {function} disFun
 * @returns {number}
 */

function intrDist(index, data, disFun) {
  var dist = 0,
      count = 0;

  for (var i = 0; i < index.length; i++) {
    for (var j = i; j < index.length; j++) {
      dist += disFun(data[index[i].index], data[index[j].index]);
      count++;
    }
  }

  return dist / count;
}
/**
 * Splits the higher level clusters
 * @param {Array <Array <number>>} data - Array of points to be clustered
 * @param {json} options
 * @constructor
 */


function diana(data, options) {
  options = Object.assign({}, defaultOptions, options);

  if (typeof options.kind === 'string') {
    switch (options.kind) {
      case 'single':
        options.kind = simpleLink;
        break;

      case 'complete':
        options.kind = completeLink;
        break;

      case 'average':
        options.kind = averageLink;
        break;

      case 'centroid':
        options.kind = centroidLink;
        break;

      case 'ward':
        options.kind = wardLink;
        break;

      default:
        throw new RangeError('Unknown kind of similarity');
    }
  } else if (typeof options.kind !== 'function') {
    throw new TypeError('Undefined kind of similarity');
  }

  var tree = new Cluster();
  tree.children = new Array(data.length);
  tree.index = new Array(data.length);

  for (var ind = 0; ind < data.length; ind++) {
    tree.children[ind] = new ClusterLeaf(ind);
    tree.index[ind] = new ClusterLeaf(ind);
  }

  tree.distance = intrDist(tree.index, data, options.dist);
  var m, M, clId, dist, rebel;
  var list = [tree];

  while (list.length > 0) {
    M = 0;
    clId = 0;

    for (var i = 0; i < list.length; i++) {
      m = 0;

      for (var j = 0; j < list[i].length; j++) {
        for (var l = j + 1; l < list[i].length; l++) {
          m = Math.max(options.dist(data[list[i].index[j].index], data[list[i].index[l].index]), m);
        }
      }

      if (m > M) {
        M = m;
        clId = i;
      }
    }

    M = 0;

    if (list[clId].index.length === 2) {
      list[clId].children = [list[clId].index[0], list[clId].index[1]];
      list[clId].distance = options.dist(data[list[clId].index[0].index], data[list[clId].index[1].index]);
    } else if (list[clId].index.length === 3) {
      list[clId].children = [list[clId].index[0], list[clId].index[1], list[clId].index[2]];
      var d = [options.dist(data[list[clId].index[0].index], data[list[clId].index[1].index]), options.dist(data[list[clId].index[1].index], data[list[clId].index[2].index])];
      list[clId].distance = (d[0] + d[1]) / 2;
    } else {
      var C = new Cluster();
      var sG = new Cluster();
      var splitting = [new Array(list[clId].index.length), []];

      for (var spl = 0; spl < splitting[0].length; spl++) {
        splitting[0][spl] = spl;
      }

      for (var ii = 0; ii < splitting[0].length; ii++) {
        dist = 0;

        for (var jj = 0; jj < splitting[0].length; jj++) {
          if (ii !== jj) {
            dist += options.dist(data[list[clId].index[splitting[0][jj]].index], data[list[clId].index[splitting[0][ii]].index]);
          }
        }

        dist /= splitting[0].length - 1;

        if (dist > M) {
          M = dist;
          rebel = ii;
        }
      }

      splitting[1] = [rebel];
      splitting[0].splice(rebel, 1);
      dist = diff(splitting, data, options.dist);

      while (dist.d > 0) {
        splitting[1].push(splitting[0][dist.p]);
        splitting[0].splice(dist.p, 1);
        dist = diff(splitting, data, options.dist);
      }

      var fData = new Array(splitting[0].length);
      C.index = new Array(splitting[0].length);

      for (var e = 0; e < fData.length; e++) {
        fData[e] = data[list[clId].index[splitting[0][e]].index];
        C.index[e] = list[clId].index[splitting[0][e]];
        C.children[e] = list[clId].index[splitting[0][e]];
      }

      var sData = new Array(splitting[1].length);
      sG.index = new Array(splitting[1].length);

      for (var f = 0; f < sData.length; f++) {
        sData[f] = data[list[clId].index[splitting[1][f]].index];
        sG.index[f] = list[clId].index[splitting[1][f]];
        sG.children[f] = list[clId].index[splitting[1][f]];
      }

      C.distance = intrDist(C.index, data, options.dist);
      sG.distance = intrDist(sG.index, data, options.dist);
      list.push(C);
      list.push(sG);
      list[clId].children = [C, sG];
    }

    list.splice(clId, 1);
  }

  return tree;
}

module.exports = diana;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Kernel = __webpack_require__(10);

const stat = __webpack_require__(3).array;

var defaultOptions = {
  C: 1,
  tol: 1e-4,
  maxPasses: 10,
  maxIterations: 10000,
  kernel: 'linear',
  alphaTol: 1e-6,
  random: Math.random,
  whitening: true
};
/**
 * Simplified version of the Sequential Minimal Optimization algorithm for training
 * support vector machines
 * @param {{Object}} options - SVM options
 * @param {Number} [options.C=1] - regularization parameter
 * @param {Number} [options.tol=1e-4] - numerical tolerance
 * @param {Number} [options.alphaTol=1e-6] - alpha tolerance, threshold to decide support vectors
 * @param {Number} [options.maxPasses=10] - max number of times to iterate over alphas without changing
 * @param {Number} [options.maxIterations=10000] - max number of iterations
 * @param {String} [options.kernel=linear] - the kind of kernel. {@link https://github.com/mljs/kernel/tree/1252de5f9012776e6e0eb06c7b434b8631fb21f0 List of kernels}
 * @param {Function} [options.random=Math.random] - custom random number generator
 * @constructor
 */

function SVM(options) {
  this.options = Object.assign({}, defaultOptions, options);
  this.kernel = new Kernel(this.options.kernel, this.options.kernelOptions);
  this.b = 0;
}
/**
 * Train the SVM model
 * @param {Array <Array <number>>} features - training data features
 * @param {Array <number>} labels - training data labels in the domain {1,-1}
 */


SVM.prototype.train = function (features, labels) {
  if (features.length !== labels.length) {
    throw new Error('Features and labels should have the same length');
  }

  if (features.length < 2) {
    throw new Error('Cannot train with less than 2 observations');
  }

  this._trained = false;
  this._loaded = false;
  this.N = labels.length;
  this.D = features[0].length;

  if (this.options.whitening) {
    this.X = new Array(this.N);

    for (var i = 0; i < this.N; i++) {
      this.X[i] = new Array(this.D);
    }

    this.minMax = new Array(this.D); // Apply normalization and keep normalization parameters

    for (var j = 0; j < this.D; j++) {
      var d = new Array(this.N);

      for (i = 0; i < this.N; i++) {
        d[i] = features[i][j];
      }

      this.minMax[j] = stat.minMax(d);

      for (i = 0; i < this.N; i++) {
        this.X[i][j] = (features[i][j] - this.minMax[j].min) / (this.minMax[j].max - this.minMax[j].min);
      }
    }
  } else {
    this.X = features;
  }

  this.Y = labels;
  this.b = 0;
  this.W = undefined;
  var kernel = this.kernel.compute(this.X);
  var m = labels.length;
  var alpha = new Array(m).fill(0);
  this.alphas = alpha;

  for (var a = 0; a < m; a++) alpha[a] = 0;

  var b1 = 0,
      b2 = 0,
      iter = 0,
      passes = 0,
      Ei = 0,
      Ej = 0,
      ai = 0,
      aj = 0,
      L = 0,
      H = 0,
      eta = 0;

  while (passes < this.options.maxPasses && iter < this.options.maxIterations) {
    var numChange = 0;

    for (i = 0; i < m; i++) {
      Ei = this._marginOnePrecomputed(i, kernel) - labels[i];

      if (labels[i] * Ei < -this.options.tol && alpha[i] < this.options.C || labels[i] * Ei > this.options.tol && alpha[i] > 0) {
        j = i;

        while (j === i) j = Math.floor(this.options.random() * m);

        Ej = this._marginOnePrecomputed(j, kernel) - labels[j];
        ai = alpha[i];
        aj = alpha[j];

        if (labels[i] === labels[j]) {
          L = Math.max(0, ai + aj - this.options.C);
          H = Math.min(this.options.C, ai + aj);
        } else {
          L = Math.max(0, aj - ai);
          H = Math.min(this.options.C, this.options.C + aj + ai);
        }

        if (Math.abs(L - H) < 1e-4) continue;
        eta = 2 * kernel[i][j] - kernel[i][i] - kernel[j][j];
        if (eta >= 0) continue;
        var newaj = alpha[j] - labels[j] * (Ei - Ej) / eta;
        if (newaj > H) newaj = H;else if (newaj < L) newaj = L;
        if (Math.abs(aj - newaj) < 10e-4) continue;
        alpha[j] = newaj;
        alpha[i] = alpha[i] + labels[i] * labels[j] * (aj - newaj);
        b1 = this.b - Ei - labels[i] * (alpha[i] - ai) * kernel[i][i] - labels[j] * (alpha[j] - aj) * kernel[i][j];
        b2 = this.b - Ej - labels[i] * (alpha[i] - ai) * kernel[i][j] - labels[j] * (alpha[j] - aj) * kernel[j][j];
        this.b = (b1 + b2) / 2;
        if (alpha[i] < this.options.C && alpha[i] > 0) this.b = b1;
        if (alpha[j] < this.options.C && alpha[j] > 0) this.b = b2;
        numChange += 1;
      }
    }

    iter++;
    if (numChange === 0) passes += 1;else passes = 0;
  }

  if (iter === this.options.maxIterations) {
    throw new Error('max iterations reached');
  }

  this.iterations = iter; // Compute the weights (useful for fast decision on new test instances when linear SVM)

  if (this.options.kernel === 'linear') {
    this.W = new Array(this.D);

    for (var r = 0; r < this.D; r++) {
      this.W[r] = 0;

      for (var w = 0; w < m; w++) this.W[r] += labels[w] * alpha[w] * this.X[w][r];
    }
  } // Keep only support vectors
  // It will compute decision on new test instances faster
  // We also keep the index of the support vectors
  // in the original data


  var nX = [];
  var nY = [];
  var nAlphas = [];
  this._supportVectorIdx = [];

  for (i = 0; i < this.N; i++) {
    if (this.alphas[i] > this.options.alphaTol) {
      nX.push(this.X[i]);
      nY.push(labels[i]);
      nAlphas.push(this.alphas[i]);

      this._supportVectorIdx.push(i);
    }
  }

  this.X = nX;
  this.Y = nY;
  this.N = nX.length;
  this.alphas = nAlphas; // A flag to say this SVM has been trained

  this._trained = true;
};
/**
 * Get prediction ({-1,1}) given one observation's features.
 * @private
 * @param p The observation's features.
 * @returns {number} Classification result ({-1,1})
 */


SVM.prototype.predictOne = function (p) {
  var margin = this.marginOne(p);
  return margin > 0 ? 1 : -1;
};
/**
 * Predict the classification outcome of a trained svm given one or several observations' features.
 * @param {Array} features - The observation(s)' features
 * @returns {Array<Number>|Number} An array of {-1, 1} if several observations are given or a number if one observation
 * is given
 */


SVM.prototype.predict = function (features) {
  if (!this._trained && !this._loaded) throw new Error('Cannot predict, you need to train the SVM first');

  if (Array.isArray(features) && Array.isArray(features[0])) {
    return features.map(this.predictOne.bind(this));
  } else {
    return this.predictOne(features);
  }
};
/**
 * Get margin given one observation's features
 * @private
 * @param {Array<Number>} features - Features
 * @returns {Number} - The computed margin
 */


SVM.prototype.marginOne = function (features, noWhitening) {
  // Apply normalization
  if (this.options.whitening && !noWhitening) {
    features = this._applyWhitening(features);
  }

  var ans = this.b,
      i;

  if (this.options.kernel === 'linear' && this.W) {
    // Use weights, it's faster
    for (i = 0; i < this.W.length; i++) {
      ans += this.W[i] * features[i];
    }
  } else {
    for (i = 0; i < this.N; i++) {
      ans += this.alphas[i] * this.Y[i] * this.kernel.compute([features], [this.X[i]])[0][0];
    }
  }

  return ans;
};
/**
 * Get a margin using the precomputed kernel. Much faster than normal margin computation
 * @private
 * @param {Number} index - Train data index
 * @param {Array< Array<Number> >} kernel - The precomputed kernel
 * @returns {number} Computed margin
 * @private
 */


SVM.prototype._marginOnePrecomputed = function (index, kernel) {
  var ans = this.b,
      i;

  for (i = 0; i < this.N; i++) {
    ans += this.alphas[i] * this.Y[i] * kernel[index][i];
  }

  return ans;
};
/**
 * Returns the margin of one or several observations given its features
 * @param {Array <Array<Number> >|Array<Number>} features - Features from on or several observations.
 * @returns {Number|Array} The computed margin. Is an Array if several observations' features given, or a Number if
 * only one observation's features given
 */


SVM.prototype.margin = function (features) {
  if (Array.isArray(features)) {
    return features.map(this.marginOne.bind(this));
  } else {
    return this.marginOne(features);
  }
};
/**
 * Get support vectors indexes of the trained classifier. WARINNG: this method does not work for svm instances
 * created from {@link #SVM.load load} if linear kernel
 * @returns {Array<Number>} The indices in the training vector of the support vectors
 */


SVM.prototype.supportVectors = function () {
  if (!this._trained && !this._loaded) throw new Error('Cannot get support vectors, you need to train the SVM first');
  if (this._loaded && this.options.kernel === 'linear') throw new Error('Cannot get support vectors from saved linear model, you need to train the SVM to have them');
  return this._supportVectorIdx;
};
/**
 * Create a SVM instance from a saved model
 * @param {Object} model -  Object such as returned by a trained SVM instance with {@link #SVM#toJSON toJSON}
 * @returns {SVM} Instance of svm classifier
 */


SVM.load = function (model) {
  this._loaded = true;
  this._trained = false;
  var svm = new SVM(model.options);

  if (model.options.kernel === 'linear') {
    svm.W = model.W.slice();
    svm.D = svm.W.length;
  } else {
    svm.X = model.X.slice();
    svm.Y = model.Y.slice();
    svm.alphas = model.alphas.slice();
    svm.N = svm.X.length;
    svm.D = svm.X[0].length;
  }

  svm.minMax = model.minMax;
  svm.b = model.b;
  svm._loaded = true;
  svm._trained = false;
  return svm;
};
/**
 * Export the minimal object that enables to reload the model
 * @returns {Object} Model object that can be reused with {@link #SVM.load load}
 */


SVM.prototype.toJSON = function () {
  if (!this._trained && !this._loaded) throw new Error('Cannot export, you need to train the SVM first');
  var model = {};
  model.options = Object.assign({}, this.options);
  model.b = this.b;
  model.minMax = this.minMax;

  if (model.options.kernel === 'linear') {
    model.W = this.W.slice();
  } else {
    // Exporting non-linear models is heavier
    model.X = this.X.slice();
    model.Y = this.Y.slice();
    model.alphas = this.alphas.slice();
  }

  return model;
};

SVM.prototype._applyWhitening = function (features) {
  if (!this.minMax) throw new Error('Could not apply whitening');
  var whitened = new Array(features.length);

  for (var j = 0; j < features.length; j++) {
    whitened[j] = (features[j] - this.minMax[j].min) / (this.minMax[j].max - this.minMax[j].min);
  }

  return whitened;
};

module.exports = SVM;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const squaredEuclidean = __webpack_require__(2).squared;

const defaultOptions = {
  sigma: 1
};

class GaussianKernel {
  constructor(options) {
    options = Object.assign({}, defaultOptions, options);
    this.sigma = options.sigma;
    this.divisor = 2 * options.sigma * options.sigma;
  }

  compute(x, y) {
    const distance = squaredEuclidean(x, y);
    return Math.exp(-distance / this.divisor);
  }

}

module.exports = GaussianKernel;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const defaultOptions = {
  degree: 1,
  constant: 1,
  scale: 1
};

class PolynomialKernel {
  constructor(options) {
    options = Object.assign({}, defaultOptions, options);
    this.degree = options.degree;
    this.constant = options.constant;
    this.scale = options.scale;
  }

  compute(x, y) {
    var sum = 0;

    for (var i = 0; i < x.length; i++) {
      sum += x[i] * y[i];
    }

    return Math.pow(this.scale * sum + this.constant, this.degree);
  }

}

module.exports = PolynomialKernel;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const defaultOptions = {
  sigma: 1,
  degree: 1
};

class ANOVAKernel {
  constructor(options) {
    options = Object.assign({}, defaultOptions, options);
    this.sigma = options.sigma;
    this.degree = options.degree;
  }

  compute(x, y) {
    var sum = 0;
    var len = Math.min(x.length, y.length);

    for (var i = 1; i <= len; ++i) {
      sum += Math.pow(Math.exp(-this.sigma * Math.pow(Math.pow(x[i - 1], i) - Math.pow(y[i - 1], i), 2)), this.degree);
    }

    return sum;
  }

}

module.exports = ANOVAKernel;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const squaredEuclidean = __webpack_require__(2).squared;

const defaultOptions = {
  sigma: 1
};

class CauchyKernel {
  constructor(options) {
    options = Object.assign({}, defaultOptions, options);
    this.sigma = options.sigma;
  }

  compute(x, y) {
    return 1 / (1 + squaredEuclidean(x, y) / (this.sigma * this.sigma));
  }

}

module.exports = CauchyKernel;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const euclidean = __webpack_require__(2);

const defaultOptions = {
  sigma: 1
};

class ExponentialKernel {
  constructor(options) {
    options = Object.assign({}, defaultOptions, options);
    this.sigma = options.sigma;
    this.divisor = 2 * options.sigma * options.sigma;
  }

  compute(x, y) {
    const distance = euclidean(x, y);
    return Math.exp(-distance / this.divisor);
  }

}

module.exports = ExponentialKernel;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


class HistogramIntersectionKernel {
  compute(x, y) {
    var min = Math.min(x.length, y.length);
    var sum = 0;

    for (var i = 0; i < min; ++i) {
      sum += Math.min(x[i], y[i]);
    }

    return sum;
  }

}

module.exports = HistogramIntersectionKernel;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const euclidean = __webpack_require__(2);

const defaultOptions = {
  sigma: 1
};

class LaplacianKernel {
  constructor(options) {
    options = Object.assign({}, defaultOptions, options);
    this.sigma = options.sigma;
  }

  compute(x, y) {
    const distance = euclidean(x, y);
    return Math.exp(-distance / this.sigma);
  }

}

module.exports = LaplacianKernel;

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const squaredEuclidean = __webpack_require__(2).squared;

const defaultOptions = {
  constant: 1
};

class MultiquadraticKernel {
  constructor(options) {
    options = Object.assign({}, defaultOptions, options);
    this.constant = options.constant;
  }

  compute(x, y) {
    return Math.sqrt(squaredEuclidean(x, y) + this.constant * this.constant);
  }

}

module.exports = MultiquadraticKernel;

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const squaredEuclidean = __webpack_require__(2).squared;

const defaultOptions = {
  constant: 1
};

class RationalQuadraticKernel {
  constructor(options) {
    options = Object.assign({}, defaultOptions, options);
    this.constant = options.constant;
  }

  compute(x, y) {
    const distance = squaredEuclidean(x, y);
    return 1 - distance / (distance + this.constant);
  }

}

module.exports = RationalQuadraticKernel;

/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const defaultOptions = {
  alpha: 0.01,
  constant: -Math.E
};

class SigmoidKernel {
  constructor(options) {
    options = Object.assign({}, defaultOptions, options);
    this.alpha = options.alpha;
    this.constant = options.constant;
  }

  compute(x, y) {
    var sum = 0;

    for (var i = 0; i < x.length; i++) {
      sum += x[i] * y[i];
    }

    return Math.tanh(this.alpha * sum + this.constant);
  }

}

module.exports = SigmoidKernel;

/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const ConfusionMatrix = __webpack_require__(25);

const CV = {};

const combinations = __webpack_require__(66);
/**
 * Performs a leave-one-out cross-validation (LOO-CV) of the given samples. In LOO-CV, 1 observation is used as the
 * validation set while the rest is used as the training set. This is repeated once for each observation. LOO-CV is a
 * special case of LPO-CV. @see leavePout
 * @param {function} Classifier - The classifier's constructor to use for the cross validation. Expect ml-classifier
 *     api.
 * @param {Array} features - The features for all samples of the data-set
 * @param {Array} labels - The classification class of all samples of the data-set
 * @param {object} classifierOptions - The classifier options with which the classifier should be instantiated.
 * @return {ConfusionMatrix} - The cross-validation confusion matrix
 */


CV.leaveOneOut = function (Classifier, features, labels, classifierOptions) {
  if (typeof labels === 'function') {
    var callback = labels;
    labels = features;
    features = Classifier;
    return CV.leavePOut(features, labels, 1, callback);
  }

  return CV.leavePOut(Classifier, features, labels, classifierOptions, 1);
};
/**
 * Performs a leave-p-out cross-validation (LPO-CV) of the given samples. In LPO-CV, p observations are used as the
 * validation set while the rest is used as the training set. This is repeated as many times as there are possible
 * ways to combine p observations from the set (unordered without replacement). Be aware that for relatively small
 * data-set size this can require a very large number of training and testing to do!
 * @param {function} Classifier - The classifier's constructor to use for the cross validation. Expect ml-classifier
 *     api.
 * @param {Array} features - The features for all samples of the data-set
 * @param {Array} labels - The classification class of all samples of the data-set
 * @param {object} classifierOptions - The classifier options with which the classifier should be instantiated.
 * @param {number} p - The size of the validation sub-samples' set
 * @return {ConfusionMatrix} - The cross-validation confusion matrix
 */


CV.leavePOut = function (Classifier, features, labels, classifierOptions, p) {
  if (typeof classifierOptions === 'function') {
    var callback = classifierOptions;
    p = labels;
    labels = features;
    features = Classifier;
  }

  check(features, labels);
  const distinct = getDistinct(labels);
  const confusionMatrix = initMatrix(distinct.length, distinct.length);
  var N = features.length;
  var gen = combinations(p, N);
  var allIdx = new Array(N);

  for (let i = 0; i < N; i++) {
    allIdx[i] = i;
  }

  for (const testIdx of gen) {
    var trainIdx = allIdx.slice();

    for (let i = testIdx.length - 1; i >= 0; i--) {
      trainIdx.splice(testIdx[i], 1);
    }

    if (callback) {
      validateWithCallback(features, labels, testIdx, trainIdx, confusionMatrix, distinct, callback);
    } else {
      validate(Classifier, features, labels, classifierOptions, testIdx, trainIdx, confusionMatrix, distinct);
    }
  }

  return new ConfusionMatrix(confusionMatrix, distinct);
};
/**
 * Performs k-fold cross-validation (KF-CV). KF-CV separates the data-set into k random equally sized partitions, and
 * uses each as a validation set, with all other partitions used in the training set. Observations left over from if k
 * does not divide the number of observations are left out of the cross-validation process.
 * @param {function} Classifier - The classifier's to use for the cross validation. Expect ml-classifier api.
 * @param {Array} features - The features for all samples of the data-set
 * @param {Array} labels - The classification class of all samples of the data-set
 * @param {object} classifierOptions - The classifier options with which the classifier should be instantiated.
 * @param {number} k - The number of partitions to create
 * @return {ConfusionMatrix} - The cross-validation confusion matrix
 */


CV.kFold = function (Classifier, features, labels, classifierOptions, k) {
  if (typeof classifierOptions === 'function') {
    var callback = classifierOptions;
    k = labels;
    labels = features;
    features = Classifier;
  }

  check(features, labels);
  const distinct = getDistinct(labels);
  const confusionMatrix = initMatrix(distinct.length, distinct.length);
  var N = features.length;
  var allIdx = new Array(N);

  for (var i = 0; i < N; i++) {
    allIdx[i] = i;
  }

  var l = Math.floor(N / k); // create random k-folds

  var current = [];
  var folds = [];

  while (allIdx.length) {
    var randi = Math.floor(Math.random() * allIdx.length);
    current.push(allIdx[randi]);
    allIdx.splice(randi, 1);

    if (current.length === l) {
      folds.push(current);
      current = [];
    }
  }

  if (current.length) folds.push(current);
  folds = folds.slice(0, k);

  for (i = 0; i < folds.length; i++) {
    var testIdx = folds[i];
    var trainIdx = [];

    for (var j = 0; j < folds.length; j++) {
      if (j !== i) trainIdx = trainIdx.concat(folds[j]);
    }

    if (callback) {
      validateWithCallback(features, labels, testIdx, trainIdx, confusionMatrix, distinct, callback);
    } else {
      validate(Classifier, features, labels, classifierOptions, testIdx, trainIdx, confusionMatrix, distinct);
    }
  }

  return new ConfusionMatrix(confusionMatrix, distinct);
};

function check(features, labels) {
  if (features.length !== labels.length) {
    throw new Error('features and labels should have the same length');
  }
}

function initMatrix(rows, columns) {
  return new Array(rows).fill(0).map(() => new Array(columns).fill(0));
}

function getDistinct(arr) {
  var s = new Set();

  for (let i = 0; i < arr.length; i++) {
    s.add(arr[i]);
  }

  return Array.from(s);
}

function validate(Classifier, features, labels, classifierOptions, testIdx, trainIdx, confusionMatrix, distinct) {
  const {
    testFeatures,
    trainFeatures,
    testLabels,
    trainLabels
  } = getTrainTest(features, labels, testIdx, trainIdx);
  var classifier;

  if (Classifier.prototype.train) {
    classifier = new Classifier(classifierOptions);
    classifier.train(trainFeatures, trainLabels);
  } else {
    classifier = new Classifier(trainFeatures, trainLabels, classifierOptions);
  }

  var predictedLabels = classifier.predict(testFeatures);
  updateConfusionMatrix(confusionMatrix, testLabels, predictedLabels, distinct);
}

function validateWithCallback(features, labels, testIdx, trainIdx, confusionMatrix, distinct, callback) {
  const {
    testFeatures,
    trainFeatures,
    testLabels,
    trainLabels
  } = getTrainTest(features, labels, testIdx, trainIdx);
  const predictedLabels = callback(trainFeatures, trainLabels, testFeatures);
  updateConfusionMatrix(confusionMatrix, testLabels, predictedLabels, distinct);
}

function updateConfusionMatrix(confusionMatrix, testLabels, predictedLabels, distinct) {
  for (var i = 0; i < predictedLabels.length; i++) {
    const actualIdx = distinct.indexOf(testLabels[i]);
    const predictedIdx = distinct.indexOf(predictedLabels[i]);

    if (actualIdx < 0 || predictedIdx < 0) {
      // eslint-disable-next-line no-console
      console.warn("ignore unknown predicted label ".concat(predictedLabels[i]));
    }

    confusionMatrix[actualIdx][predictedIdx]++;
  }
}

function getTrainTest(features, labels, testIdx, trainIdx) {
  return {
    testFeatures: testIdx.map(function (index) {
      return features[index];
    }),
    trainFeatures: trainIdx.map(function (index) {
      return features[index];
    }),
    testLabels: testIdx.map(function (index) {
      return labels[index];
    }),
    trainLabels: trainIdx.map(function (index) {
      return labels[index];
    })
  };
}

module.exports = CV;

/***/ }),
/* 66 */
/***/ (function(module, exports, __webpack_require__) {

(function (global, factory) {
   true ? factory() : undefined;
})(this, function () {
  'use strict';

  function createCommonjsModule(fn, module) {
    return module = {
      exports: {}
    }, fn(module, module.exports), module.exports;
  }

  var runtime = createCommonjsModule(function (module) {
    /**
     * Copyright (c) 2014-present, Facebook, Inc.
     *
     * This source code is licensed under the MIT license found in the
     * LICENSE file in the root directory of this source tree.
     */
    !function (global) {
      var Op = Object.prototype;
      var hasOwn = Op.hasOwnProperty;
      var undefined; // More compressible than void 0.

      var $Symbol = typeof Symbol === "function" ? Symbol : {};
      var iteratorSymbol = $Symbol.iterator || "@@iterator";
      var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
      var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";
      var runtime = global.regeneratorRuntime;

      if (runtime) {
        {
          // If regeneratorRuntime is defined globally and we're in a module,
          // make the exports object identical to regeneratorRuntime.
          module.exports = runtime;
        } // Don't bother evaluating the rest of this file if the runtime was
        // already defined globally.

        return;
      } // Define the runtime globally (as expected by generated code) as either
      // module.exports (if we're in a module) or a new, empty object.


      runtime = global.regeneratorRuntime = module.exports;

      function wrap(innerFn, outerFn, self, tryLocsList) {
        // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
        var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
        var generator = Object.create(protoGenerator.prototype);
        var context = new Context(tryLocsList || []); // The ._invoke method unifies the implementations of the .next,
        // .throw, and .return methods.

        generator._invoke = makeInvokeMethod(innerFn, self, context);
        return generator;
      }

      runtime.wrap = wrap; // Try/catch helper to minimize deoptimizations. Returns a completion
      // record like context.tryEntries[i].completion. This interface could
      // have been (and was previously) designed to take a closure to be
      // invoked without arguments, but in all the cases we care about we
      // already have an existing method we want to call, so there's no need
      // to create a new function object. We can even get away with assuming
      // the method takes exactly one argument, since that happens to be true
      // in every case, so we don't have to touch the arguments object. The
      // only additional allocation required is the completion record, which
      // has a stable shape and so hopefully should be cheap to allocate.

      function tryCatch(fn, obj, arg) {
        try {
          return {
            type: "normal",
            arg: fn.call(obj, arg)
          };
        } catch (err) {
          return {
            type: "throw",
            arg: err
          };
        }
      }

      var GenStateSuspendedStart = "suspendedStart";
      var GenStateSuspendedYield = "suspendedYield";
      var GenStateExecuting = "executing";
      var GenStateCompleted = "completed"; // Returning this object from the innerFn has the same effect as
      // breaking out of the dispatch switch statement.

      var ContinueSentinel = {}; // Dummy constructor functions that we use as the .constructor and
      // .constructor.prototype properties for functions that return Generator
      // objects. For full spec compliance, you may wish to configure your
      // minifier not to mangle the names of these two functions.

      function Generator() {}

      function GeneratorFunction() {}

      function GeneratorFunctionPrototype() {} // This is a polyfill for %IteratorPrototype% for environments that
      // don't natively support it.


      var IteratorPrototype = {};

      IteratorPrototype[iteratorSymbol] = function () {
        return this;
      };

      var getProto = Object.getPrototypeOf;
      var NativeIteratorPrototype = getProto && getProto(getProto(values([])));

      if (NativeIteratorPrototype && NativeIteratorPrototype !== Op && hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
        // This environment has a native %IteratorPrototype%; use it instead
        // of the polyfill.
        IteratorPrototype = NativeIteratorPrototype;
      }

      var Gp = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(IteratorPrototype);
      GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
      GeneratorFunctionPrototype.constructor = GeneratorFunction;
      GeneratorFunctionPrototype[toStringTagSymbol] = GeneratorFunction.displayName = "GeneratorFunction"; // Helper for defining the .next, .throw, and .return methods of the
      // Iterator interface in terms of a single ._invoke method.

      function defineIteratorMethods(prototype) {
        ["next", "throw", "return"].forEach(function (method) {
          prototype[method] = function (arg) {
            return this._invoke(method, arg);
          };
        });
      }

      runtime.isGeneratorFunction = function (genFun) {
        var ctor = typeof genFun === "function" && genFun.constructor;
        return ctor ? ctor === GeneratorFunction || // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction" : false;
      };

      runtime.mark = function (genFun) {
        if (Object.setPrototypeOf) {
          Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
        } else {
          genFun.__proto__ = GeneratorFunctionPrototype;

          if (!(toStringTagSymbol in genFun)) {
            genFun[toStringTagSymbol] = "GeneratorFunction";
          }
        }

        genFun.prototype = Object.create(Gp);
        return genFun;
      }; // Within the body of any async function, `await x` is transformed to
      // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
      // `hasOwn.call(value, "__await")` to determine if the yielded value is
      // meant to be awaited.


      runtime.awrap = function (arg) {
        return {
          __await: arg
        };
      };

      function AsyncIterator(generator) {
        function invoke(method, arg, resolve, reject) {
          var record = tryCatch(generator[method], generator, arg);

          if (record.type === "throw") {
            reject(record.arg);
          } else {
            var result = record.arg;
            var value = result.value;

            if (value && typeof value === "object" && hasOwn.call(value, "__await")) {
              return Promise.resolve(value.__await).then(function (value) {
                invoke("next", value, resolve, reject);
              }, function (err) {
                invoke("throw", err, resolve, reject);
              });
            }

            return Promise.resolve(value).then(function (unwrapped) {
              // When a yielded Promise is resolved, its final value becomes
              // the .value of the Promise<{value,done}> result for the
              // current iteration. If the Promise is rejected, however, the
              // result for this iteration will be rejected with the same
              // reason. Note that rejections of yielded Promises are not
              // thrown back into the generator function, as is the case
              // when an awaited Promise is rejected. This difference in
              // behavior between yield and await is important, because it
              // allows the consumer to decide what to do with the yielded
              // rejection (swallow it and continue, manually .throw it back
              // into the generator, abandon iteration, whatever). With
              // await, by contrast, there is no opportunity to examine the
              // rejection reason outside the generator function, so the
              // only option is to throw it from the await expression, and
              // let the generator function handle the exception.
              result.value = unwrapped;
              resolve(result);
            }, reject);
          }
        }

        var previousPromise;

        function enqueue(method, arg) {
          function callInvokeWithMethodAndArg() {
            return new Promise(function (resolve, reject) {
              invoke(method, arg, resolve, reject);
            });
          }

          return previousPromise = // If enqueue has been called before, then we want to wait until
          // all previous Promises have been resolved before calling invoke,
          // so that results are always delivered in the correct order. If
          // enqueue has not been called before, then it is important to
          // call invoke immediately, without waiting on a callback to fire,
          // so that the async generator function has the opportunity to do
          // any necessary setup in a predictable way. This predictability
          // is why the Promise constructor synchronously invokes its
          // executor callback, and why async functions synchronously
          // execute code before the first await. Since we implement simple
          // async functions in terms of async generators, it is especially
          // important to get this right, even though it requires care.
          previousPromise ? previousPromise.then(callInvokeWithMethodAndArg, // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg) : callInvokeWithMethodAndArg();
        } // Define the unified helper method that is used to implement .next,
        // .throw, and .return (see defineIteratorMethods).


        this._invoke = enqueue;
      }

      defineIteratorMethods(AsyncIterator.prototype);

      AsyncIterator.prototype[asyncIteratorSymbol] = function () {
        return this;
      };

      runtime.AsyncIterator = AsyncIterator; // Note that simple async functions are implemented on top of
      // AsyncIterator objects; they just return a Promise for the value of
      // the final result produced by the iterator.

      runtime.async = function (innerFn, outerFn, self, tryLocsList) {
        var iter = new AsyncIterator(wrap(innerFn, outerFn, self, tryLocsList));
        return runtime.isGeneratorFunction(outerFn) ? iter // If outerFn is a generator, return the full iterator.
        : iter.next().then(function (result) {
          return result.done ? result.value : iter.next();
        });
      };

      function makeInvokeMethod(innerFn, self, context) {
        var state = GenStateSuspendedStart;
        return function invoke(method, arg) {
          if (state === GenStateExecuting) {
            throw new Error("Generator is already running");
          }

          if (state === GenStateCompleted) {
            if (method === "throw") {
              throw arg;
            } // Be forgiving, per 25.3.3.3.3 of the spec:
            // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume


            return doneResult();
          }

          context.method = method;
          context.arg = arg;

          while (true) {
            var delegate = context.delegate;

            if (delegate) {
              var delegateResult = maybeInvokeDelegate(delegate, context);

              if (delegateResult) {
                if (delegateResult === ContinueSentinel) continue;
                return delegateResult;
              }
            }

            if (context.method === "next") {
              // Setting context._sent for legacy support of Babel's
              // function.sent implementation.
              context.sent = context._sent = context.arg;
            } else if (context.method === "throw") {
              if (state === GenStateSuspendedStart) {
                state = GenStateCompleted;
                throw context.arg;
              }

              context.dispatchException(context.arg);
            } else if (context.method === "return") {
              context.abrupt("return", context.arg);
            }

            state = GenStateExecuting;
            var record = tryCatch(innerFn, self, context);

            if (record.type === "normal") {
              // If an exception is thrown from innerFn, we leave state ===
              // GenStateExecuting and loop back for another invocation.
              state = context.done ? GenStateCompleted : GenStateSuspendedYield;

              if (record.arg === ContinueSentinel) {
                continue;
              }

              return {
                value: record.arg,
                done: context.done
              };
            } else if (record.type === "throw") {
              state = GenStateCompleted; // Dispatch the exception by looping back around to the
              // context.dispatchException(context.arg) call above.

              context.method = "throw";
              context.arg = record.arg;
            }
          }
        };
      } // Call delegate.iterator[context.method](context.arg) and handle the
      // result, either by returning a { value, done } result from the
      // delegate iterator, or by modifying context.method and context.arg,
      // setting context.delegate to null, and returning the ContinueSentinel.


      function maybeInvokeDelegate(delegate, context) {
        var method = delegate.iterator[context.method];

        if (method === undefined) {
          // A .throw or .return when the delegate iterator has no .throw
          // method always terminates the yield* loop.
          context.delegate = null;

          if (context.method === "throw") {
            if (delegate.iterator.return) {
              // If the delegate iterator has a return method, give it a
              // chance to clean up.
              context.method = "return";
              context.arg = undefined;
              maybeInvokeDelegate(delegate, context);

              if (context.method === "throw") {
                // If maybeInvokeDelegate(context) changed context.method from
                // "return" to "throw", let that override the TypeError below.
                return ContinueSentinel;
              }
            }

            context.method = "throw";
            context.arg = new TypeError("The iterator does not provide a 'throw' method");
          }

          return ContinueSentinel;
        }

        var record = tryCatch(method, delegate.iterator, context.arg);

        if (record.type === "throw") {
          context.method = "throw";
          context.arg = record.arg;
          context.delegate = null;
          return ContinueSentinel;
        }

        var info = record.arg;

        if (!info) {
          context.method = "throw";
          context.arg = new TypeError("iterator result is not an object");
          context.delegate = null;
          return ContinueSentinel;
        }

        if (info.done) {
          // Assign the result of the finished delegate to the temporary
          // variable specified by delegate.resultName (see delegateYield).
          context[delegate.resultName] = info.value; // Resume execution at the desired location (see delegateYield).

          context.next = delegate.nextLoc; // If context.method was "throw" but the delegate handled the
          // exception, let the outer generator proceed normally. If
          // context.method was "next", forget context.arg since it has been
          // "consumed" by the delegate iterator. If context.method was
          // "return", allow the original .return call to continue in the
          // outer generator.

          if (context.method !== "return") {
            context.method = "next";
            context.arg = undefined;
          }
        } else {
          // Re-yield the result returned by the delegate method.
          return info;
        } // The delegate iterator is finished, so forget it and continue with
        // the outer generator.


        context.delegate = null;
        return ContinueSentinel;
      } // Define Generator.prototype.{next,throw,return} in terms of the
      // unified ._invoke helper method.


      defineIteratorMethods(Gp);
      Gp[toStringTagSymbol] = "Generator"; // A Generator should always return itself as the iterator object when the
      // @@iterator function is called on it. Some browsers' implementations of the
      // iterator prototype chain incorrectly implement this, causing the Generator
      // object to not be returned from this call. This ensures that doesn't happen.
      // See https://github.com/facebook/regenerator/issues/274 for more details.

      Gp[iteratorSymbol] = function () {
        return this;
      };

      Gp.toString = function () {
        return "[object Generator]";
      };

      function pushTryEntry(locs) {
        var entry = {
          tryLoc: locs[0]
        };

        if (1 in locs) {
          entry.catchLoc = locs[1];
        }

        if (2 in locs) {
          entry.finallyLoc = locs[2];
          entry.afterLoc = locs[3];
        }

        this.tryEntries.push(entry);
      }

      function resetTryEntry(entry) {
        var record = entry.completion || {};
        record.type = "normal";
        delete record.arg;
        entry.completion = record;
      }

      function Context(tryLocsList) {
        // The root entry object (effectively a try statement without a catch
        // or a finally block) gives us a place to store values thrown from
        // locations where there is no enclosing try statement.
        this.tryEntries = [{
          tryLoc: "root"
        }];
        tryLocsList.forEach(pushTryEntry, this);
        this.reset(true);
      }

      runtime.keys = function (object) {
        var keys = [];

        for (var key in object) {
          keys.push(key);
        }

        keys.reverse(); // Rather than returning an object with a next method, we keep
        // things simple and return the next function itself.

        return function next() {
          while (keys.length) {
            var key = keys.pop();

            if (key in object) {
              next.value = key;
              next.done = false;
              return next;
            }
          } // To avoid creating an additional object, we just hang the .value
          // and .done properties off the next function object itself. This
          // also ensures that the minifier will not anonymize the function.


          next.done = true;
          return next;
        };
      };

      function values(iterable) {
        if (iterable) {
          var iteratorMethod = iterable[iteratorSymbol];

          if (iteratorMethod) {
            return iteratorMethod.call(iterable);
          }

          if (typeof iterable.next === "function") {
            return iterable;
          }

          if (!isNaN(iterable.length)) {
            var i = -1,
                next = function next() {
              while (++i < iterable.length) {
                if (hasOwn.call(iterable, i)) {
                  next.value = iterable[i];
                  next.done = false;
                  return next;
                }
              }

              next.value = undefined;
              next.done = true;
              return next;
            };

            return next.next = next;
          }
        } // Return an iterator with no values.


        return {
          next: doneResult
        };
      }

      runtime.values = values;

      function doneResult() {
        return {
          value: undefined,
          done: true
        };
      }

      Context.prototype = {
        constructor: Context,
        reset: function reset(skipTempReset) {
          this.prev = 0;
          this.next = 0; // Resetting context._sent for legacy support of Babel's
          // function.sent implementation.

          this.sent = this._sent = undefined;
          this.done = false;
          this.delegate = null;
          this.method = "next";
          this.arg = undefined;
          this.tryEntries.forEach(resetTryEntry);

          if (!skipTempReset) {
            for (var name in this) {
              // Not sure about the optimal order of these conditions:
              if (name.charAt(0) === "t" && hasOwn.call(this, name) && !isNaN(+name.slice(1))) {
                this[name] = undefined;
              }
            }
          }
        },
        stop: function stop() {
          this.done = true;
          var rootEntry = this.tryEntries[0];
          var rootRecord = rootEntry.completion;

          if (rootRecord.type === "throw") {
            throw rootRecord.arg;
          }

          return this.rval;
        },
        dispatchException: function dispatchException(exception) {
          if (this.done) {
            throw exception;
          }

          var context = this;

          function handle(loc, caught) {
            record.type = "throw";
            record.arg = exception;
            context.next = loc;

            if (caught) {
              // If the dispatched exception was caught by a catch block,
              // then let that catch block handle the exception normally.
              context.method = "next";
              context.arg = undefined;
            }

            return !!caught;
          }

          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];
            var record = entry.completion;

            if (entry.tryLoc === "root") {
              // Exception thrown outside of any try block that could handle
              // it, so set the completion value of the entire function to
              // throw the exception.
              return handle("end");
            }

            if (entry.tryLoc <= this.prev) {
              var hasCatch = hasOwn.call(entry, "catchLoc");
              var hasFinally = hasOwn.call(entry, "finallyLoc");

              if (hasCatch && hasFinally) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                } else if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else if (hasCatch) {
                if (this.prev < entry.catchLoc) {
                  return handle(entry.catchLoc, true);
                }
              } else if (hasFinally) {
                if (this.prev < entry.finallyLoc) {
                  return handle(entry.finallyLoc);
                }
              } else {
                throw new Error("try statement without catch or finally");
              }
            }
          }
        },
        abrupt: function abrupt(type, arg) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc <= this.prev && hasOwn.call(entry, "finallyLoc") && this.prev < entry.finallyLoc) {
              var finallyEntry = entry;
              break;
            }
          }

          if (finallyEntry && (type === "break" || type === "continue") && finallyEntry.tryLoc <= arg && arg <= finallyEntry.finallyLoc) {
            // Ignore the finally entry if control is not jumping to a
            // location outside the try/catch block.
            finallyEntry = null;
          }

          var record = finallyEntry ? finallyEntry.completion : {};
          record.type = type;
          record.arg = arg;

          if (finallyEntry) {
            this.method = "next";
            this.next = finallyEntry.finallyLoc;
            return ContinueSentinel;
          }

          return this.complete(record);
        },
        complete: function complete(record, afterLoc) {
          if (record.type === "throw") {
            throw record.arg;
          }

          if (record.type === "break" || record.type === "continue") {
            this.next = record.arg;
          } else if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          } else if (record.type === "normal" && afterLoc) {
            this.next = afterLoc;
          }

          return ContinueSentinel;
        },
        finish: function finish(finallyLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.finallyLoc === finallyLoc) {
              this.complete(entry.completion, entry.afterLoc);
              resetTryEntry(entry);
              return ContinueSentinel;
            }
          }
        },
        "catch": function _catch(tryLoc) {
          for (var i = this.tryEntries.length - 1; i >= 0; --i) {
            var entry = this.tryEntries[i];

            if (entry.tryLoc === tryLoc) {
              var record = entry.completion;

              if (record.type === "throw") {
                var thrown = record.arg;
                resetTryEntry(entry);
              }

              return thrown;
            }
          } // The context.catch method must only be called with a location
          // argument that corresponds to a known catch block.


          throw new Error("illegal catch attempt");
        },
        delegateYield: function delegateYield(iterable, resultName, nextLoc) {
          this.delegate = {
            iterator: values(iterable),
            resultName: resultName,
            nextLoc: nextLoc
          };

          if (this.method === "next") {
            // Deliberately forget the last sent value so that we don't
            // accidentally pass it on to the delegate.
            this.arg = undefined;
          }

          return ContinueSentinel;
        }
      };
    }( // In sloppy mode, unbound `this` refers to the global object, fallback to
    // Function constructor if we're in global strict mode. That is sadly a form
    // of indirect eval which violates Content Security Policy.
    function () {
      return this;
    }() || Function("return this")());
  });
  /**
   * Copyright (c) 2014-present, Facebook, Inc.
   *
   * This source code is licensed under the MIT license found in the
   * LICENSE file in the root directory of this source tree.
   */
  // This method of obtaining a reference to the global object needs to be
  // kept identical to the way it is obtained in runtime.js

  var g = function () {
    return this;
  }() || Function("return this")(); // Use `getOwnPropertyNames` because not all browsers support calling
  // `hasOwnProperty` on the global `self` object in a worker. See #183.


  var hadRuntime = g.regeneratorRuntime && Object.getOwnPropertyNames(g).indexOf("regeneratorRuntime") >= 0; // Save the old regeneratorRuntime in case it needs to be restored later.

  var oldRuntime = hadRuntime && g.regeneratorRuntime; // Force reevalutation of runtime.js.

  g.regeneratorRuntime = undefined;
  var runtimeModule = runtime;

  if (hadRuntime) {
    // Restore the original runtime.
    g.regeneratorRuntime = oldRuntime;
  } else {
    // Remove the global property added by runtime.js.
    try {
      delete g.regeneratorRuntime;
    } catch (e) {
      g.regeneratorRuntime = undefined;
    }
  }

  var regenerator = runtimeModule;
  var defaultOptions = {
    mode: 'index'
  };
  module.exports =
  /*#__PURE__*/
  regenerator.mark(function _callee(M, N, options) {
    var a, c, b, p, x, y, z, i, twiddle;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            twiddle = function twiddle() {
              var i, j, k;
              j = 1;

              while (p[j] <= 0) {
                j++;
              }

              if (p[j - 1] === 0) {
                for (i = j - 1; i !== 1; i--) {
                  p[i] = -1;
                }

                p[j] = 0;
                x = z = 0;
                p[1] = 1;
                y = j - 1;
              } else {
                if (j > 1) {
                  p[j - 1] = 0;
                }

                do {
                  j++;
                } while (p[j] > 0);

                k = j - 1;
                i = j;

                while (p[i] === 0) {
                  p[i++] = -1;
                }

                if (p[i] === -1) {
                  p[i] = p[k];
                  z = p[k] - 1;
                  x = i - 1;
                  y = k - 1;
                  p[k] = -1;
                } else {
                  if (i === p[0]) {
                    return 0;
                  } else {
                    p[j] = p[i];
                    z = p[i] - 1;
                    p[i] = 0;
                    x = j - 1;
                    y = i - 1;
                  }
                }
              }

              return 1;
            };

            options = Object.assign({}, defaultOptions, options);
            a = new Array(N);
            c = new Array(M);
            b = new Array(N);
            p = new Array(N + 2); // init a and b

            for (i = 0; i < N; i++) {
              a[i] = i;
              if (i < N - M) b[i] = 0;else b[i] = 1;
            } // init c


            for (i = 0; i < M; i++) {
              c[i] = N - M + i;
            } // init p


            for (i = 0; i < p.length; i++) {
              if (i === 0) p[i] = N + 1;else if (i <= N - M) p[i] = 0;else if (i <= N) p[i] = i - N + M;else p[i] = -2;
            }

            if (!(options.mode === 'index')) {
              _context.next = 20;
              break;
            }

            _context.next = 12;
            return c.slice();

          case 12:
            if (!twiddle()) {
              _context.next = 18;
              break;
            }

            c[z] = a[x];
            _context.next = 16;
            return c.slice();

          case 16:
            _context.next = 12;
            break;

          case 18:
            _context.next = 33;
            break;

          case 20:
            if (!(options.mode === 'mask')) {
              _context.next = 32;
              break;
            }

            _context.next = 23;
            return b.slice();

          case 23:
            if (!twiddle()) {
              _context.next = 30;
              break;
            }

            b[x] = 1;
            b[y] = 0;
            _context.next = 28;
            return b.slice();

          case 28:
            _context.next = 23;
            break;

          case 30:
            _context.next = 33;
            break;

          case 32:
            throw new Error('Invalid mode');

          case 33:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, this);
  });
});

/***/ }),
/* 67 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Matrix = __webpack_require__(0).Matrix;

const Layer = __webpack_require__(26);

const OutputLayer = __webpack_require__(68);

const Utils = __webpack_require__(27);

const ACTIVATION_FUNCTIONS = __webpack_require__(28);

class FeedForwardNeuralNetworks {
  /**
   * Create a new Feedforword neural network model.
   * @class FeedForwardNeuralNetworks
   * @param {object} [options]
   * @param {Array} [options.hiddenLayers=[10]] - Array that contains the sizes of the hidden layers.
   * @param {number} [options.iterations=50] - Number of iterations at the training step.
   * @param {number} [options.learningRate=0.01] - Learning rate of the neural net (also known as epsilon).
   * @param {number} [options.regularization=0.01] - Regularization parameter af the neural net.
   * @param {string} [options.activation='tanh'] - activation function to be used. (options: 'tanh'(default),
   * 'identity', 'logistic', 'arctan', 'softsign', 'relu', 'softplus', 'bent', 'sinusoid', 'sinc', 'gaussian').
   * (single-parametric options: 'parametric-relu', 'exponential-relu', 'soft-exponential').
   * @param {number} [options.activationParam=1] - if the selected activation function needs a parameter.
   */
  constructor(options) {
    options = options || {};

    if (options.model) {
      // load network
      this.hiddenLayers = options.hiddenLayers;
      this.iterations = options.iterations;
      this.learningRate = options.learningRate;
      this.regularization = options.regularization;
      this.dicts = options.dicts;
      this.activation = options.activation;
      this.activationParam = options.activationParam;
      this.model = new Array(options.layers.length);

      for (var i = 0; i < this.model.length - 1; ++i) {
        this.model[i] = Layer.load(options.layers[i]);
      }

      this.model[this.model.length - 1] = OutputLayer.load(options.layers[this.model.length - 1]);
    } else {
      // default constructor
      this.hiddenLayers = options.hiddenLayers || [10];
      this.iterations = options.iterations || 50;
      this.learningRate = options.learningRate || 0.01;
      this.regularization = options.regularization || 0.01;
      this.activation = options.activation || 'tanh';
      this.activationParam = options.activationParam || 1;

      if (!(this.activation in Object.keys(ACTIVATION_FUNCTIONS))) {
        this.activation = 'tanh';
      }
    }
  }
  /**
   * @private
   * Function that build and initialize the neural net.
   * @param {number} inputSize - total of features to fit.
   * @param {number} outputSize - total of labels of the prediction set.
   */


  buildNetwork(inputSize, outputSize) {
    var size = 2 + (this.hiddenLayers.length - 1);
    this.model = new Array(size); // input layer

    this.model[0] = new Layer({
      inputSize: inputSize,
      outputSize: this.hiddenLayers[0],
      activation: this.activation,
      activationParam: this.activationParam,
      regularization: this.regularization,
      epsilon: this.learningRate
    }); // hidden layers

    for (var i = 1; i < this.hiddenLayers.length; ++i) {
      this.model[i] = new Layer({
        inputSize: this.hiddenLayers[i - 1],
        outputSize: this.hiddenLayers[i],
        activation: this.activation,
        activationParam: this.activationParam,
        regularization: this.regularization,
        epsilon: this.learningRate
      });
    } // output layer


    this.model[size - 1] = new OutputLayer({
      inputSize: this.hiddenLayers[this.hiddenLayers.length - 1],
      outputSize: outputSize,
      activation: this.activation,
      activationParam: this.activationParam,
      regularization: this.regularization,
      epsilon: this.learningRate
    });
  }
  /**
   * Train the neural net with the given features and labels.
   * @param {Matrix|Array} features
   * @param {Matrix|Array} labels
   */


  train(features, labels) {
    features = Matrix.checkMatrix(features);
    this.dicts = Utils.dictOutputs(labels);
    var inputSize = features.columns;
    var outputSize = Object.keys(this.dicts.inputs).length;
    this.buildNetwork(inputSize, outputSize);

    for (var i = 0; i < this.iterations; ++i) {
      var probabilities = this.propagate(features);
      this.backpropagation(features, labels, probabilities);
    }
  }
  /**
   * @private
   * Propagate the input(training set) and retrives the probabilities of each class.
   * @param {Matrix} X
   * @return {Matrix} probabilities of each class.
   */


  propagate(X) {
    var input = X;

    for (var i = 0; i < this.model.length; ++i) {
      //console.log(i);
      input = this.model[i].forward(input);
    } // get probabilities


    return input.divColumnVector(Utils.sumRow(input));
  }
  /**
   * @private
   * Function that applies the backpropagation algorithm on each layer of the network
   * in order to fit the features and labels.
   * @param {Matrix} features
   * @param {Array} labels
   * @param {Matrix} probabilities - probabilities of each class of the feature set.
   */


  backpropagation(features, labels, probabilities) {
    for (var i = 0; i < probabilities.length; ++i) {
      probabilities[i][this.dicts.inputs[labels[i]]] -= 1;
    } // remember, the last delta doesn't matter


    var delta = probabilities;

    for (i = this.model.length - 1; i >= 0; --i) {
      var a = i > 0 ? this.model[i - 1].a : features;
      delta = this.model[i].backpropagation(delta, a);
    }

    for (i = 0; i < this.model.length; ++i) {
      this.model[i].update();
    }
  }
  /**
   * Predict the output given the feature set.
   * @param {Array|Matrix} features
   * @return {Array}
   */


  predict(features) {
    features = Matrix.checkMatrix(features);
    var outputs = new Array(features.rows);
    var probabilities = this.propagate(features);

    for (var i = 0; i < features.rows; ++i) {
      outputs[i] = this.dicts.outputs[probabilities.maxRowIndex(i)[1]];
    }

    return outputs;
  }
  /**
   * Export the current model to JSON.
   * @return {object} model
   */


  toJSON() {
    var model = {
      model: 'FNN',
      hiddenLayers: this.hiddenLayers,
      iterations: this.iterations,
      learningRate: this.learningRate,
      regularization: this.regularization,
      activation: this.activation,
      activationParam: this.activationParam,
      dicts: this.dicts,
      layers: new Array(this.model.length)
    };

    for (var i = 0; i < this.model.length; ++i) {
      model.layers[i] = this.model[i].toJSON();
    }

    return model;
  }
  /**
   * Load a Feedforward Neural Network with the current model.
   * @param {object} model
   * @return {FeedForwardNeuralNetworks}
   */


  static load(model) {
    if (model.model !== 'FNN') {
      throw new RangeError('the current model is not a feed forward network');
    }

    return new FeedForwardNeuralNetworks(model);
  }

}

module.exports = FeedForwardNeuralNetworks;

/***/ }),
/* 68 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var Layer = __webpack_require__(26);

class OutputLayer extends Layer {
  constructor(options) {
    super(options);

    this.activationFunction = function (i, j) {
      this[i][j] = Math.exp(this[i][j]);
    };
  }

  static load(model) {
    if (model.model !== 'Layer') {
      throw new RangeError('the current model is not a Layer model');
    }

    return new OutputLayer(model);
  }

}

module.exports = OutputLayer;

/***/ }),
/* 69 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var NodeSquare = __webpack_require__(29),
    NodeHexagonal = __webpack_require__(70);

var defaultOptions = {
  fields: 3,
  randomizer: Math.random,
  distance: squareEuclidean,
  iterations: 10,
  learningRate: 0.1,
  gridType: 'rect',
  torus: true,
  method: 'random'
};

function SOM(x, y, options, reload) {
  this.x = x;
  this.y = y;
  options = options || {};
  this.options = {};

  for (var i in defaultOptions) {
    if (options.hasOwnProperty(i)) {
      this.options[i] = options[i];
    } else {
      this.options[i] = defaultOptions[i];
    }
  }

  if (typeof this.options.fields === 'number') {
    this.numWeights = this.options.fields;
  } else if (Array.isArray(this.options.fields)) {
    this.numWeights = this.options.fields.length;
    var converters = getConverters(this.options.fields);
    this.extractor = converters.extractor;
    this.creator = converters.creator;
  } else {
    throw new Error('Invalid fields definition');
  }

  if (this.options.gridType === 'rect') {
    this.nodeType = NodeSquare;
    this.gridDim = {
      x: x,
      y: y
    };
  } else {
    this.nodeType = NodeHexagonal;
    var hx = this.x - Math.floor(this.y / 2);
    this.gridDim = {
      x: hx,
      y: this.y,
      z: -(0 - hx - this.y)
    };
  }

  this.torus = this.options.torus;
  this.distanceMethod = this.torus ? 'getDistanceTorus' : 'getDistance';
  this.distance = this.options.distance;
  this.maxDistance = getMaxDistance(this.distance, this.numWeights);

  if (reload === true) {
    // For model loading
    this.done = true;
    return;
  }

  if (!(x > 0 && y > 0)) {
    throw new Error('x and y must be positive');
  }

  this.times = {
    findBMU: 0,
    adjust: 0
  };
  this.randomizer = this.options.randomizer;
  this.iterationCount = 0;
  this.iterations = this.options.iterations;
  this.startLearningRate = this.learningRate = this.options.learningRate;
  this.mapRadius = Math.floor(Math.max(x, y) / 2);
  this.algorithmMethod = this.options.method;

  this._initNodes();

  this.done = false;
}

SOM.load = function loadModel(model, distance) {
  if (model.name === 'SOM') {
    var x = model.data.length,
        y = model.data[0].length;

    if (distance) {
      model.options.distance = distance;
    } else if (model.options.distance) {
      model.options.distance = eval('(' + model.options.distance + ')');
    }

    var som = new SOM(x, y, model.options, true);
    som.nodes = new Array(x);

    for (var i = 0; i < x; i++) {
      som.nodes[i] = new Array(y);

      for (var j = 0; j < y; j++) {
        som.nodes[i][j] = new som.nodeType(i, j, model.data[i][j], som);
      }
    }

    return som;
  } else {
    throw new Error('expecting a SOM model');
  }
};

SOM.prototype.export = function exportModel(includeDistance) {
  if (!this.done) {
    throw new Error('model is not ready yet');
  }

  var model = {
    name: 'SOM'
  };
  model.options = {
    fields: this.options.fields,
    gridType: this.options.gridType,
    torus: this.options.torus
  };
  model.data = new Array(this.x);

  for (var i = 0; i < this.x; i++) {
    model.data[i] = new Array(this.y);

    for (var j = 0; j < this.y; j++) {
      model.data[i][j] = this.nodes[i][j].weights;
    }
  }

  if (includeDistance) {
    model.options.distance = this.distance.toString();
  }

  return model;
};

SOM.prototype._initNodes = function initNodes() {
  var now = Date.now(),
      i,
      j,
      k;
  this.nodes = new Array(this.x);

  for (i = 0; i < this.x; i++) {
    this.nodes[i] = new Array(this.y);

    for (j = 0; j < this.y; j++) {
      var weights = new Array(this.numWeights);

      for (k = 0; k < this.numWeights; k++) {
        weights[k] = this.randomizer();
      }

      this.nodes[i][j] = new this.nodeType(i, j, weights, this);
    }
  }

  this.times.initNodes = Date.now() - now;
};

SOM.prototype.setTraining = function setTraining(trainingSet) {
  if (this.trainingSet) {
    throw new Error('training set has already been set');
  }

  var now = Date.now();
  var convertedSet = trainingSet;
  var i,
      l = trainingSet.length;

  if (this.extractor) {
    convertedSet = new Array(l);

    for (i = 0; i < l; i++) {
      convertedSet[i] = this.extractor(trainingSet[i]);
    }
  }

  this.numIterations = this.iterations * l;

  if (this.algorithmMethod === 'random') {
    this.timeConstant = this.numIterations / Math.log(this.mapRadius);
  } else {
    this.timeConstant = l / Math.log(this.mapRadius);
  }

  this.trainingSet = convertedSet;
  this.times.setTraining = Date.now() - now;
};

SOM.prototype.trainOne = function trainOne() {
  if (this.done) {
    return false;
  } else if (this.numIterations-- > 0) {
    var neighbourhoodRadius, trainingValue, trainingSetFactor;

    if (this.algorithmMethod === 'random') {
      // Pick a random value of the training set at each step
      neighbourhoodRadius = this.mapRadius * Math.exp(-this.iterationCount / this.timeConstant);
      trainingValue = getRandomValue(this.trainingSet, this.randomizer);

      this._adjust(trainingValue, neighbourhoodRadius);

      this.learningRate = this.startLearningRate * Math.exp(-this.iterationCount / this.numIterations);
    } else {
      // Get next input vector
      trainingSetFactor = -Math.floor(this.iterationCount / this.trainingSet.length);
      neighbourhoodRadius = this.mapRadius * Math.exp(trainingSetFactor / this.timeConstant);
      trainingValue = this.trainingSet[this.iterationCount % this.trainingSet.length];

      this._adjust(trainingValue, neighbourhoodRadius);

      if ((this.iterationCount + 1) % this.trainingSet.length === 0) {
        this.learningRate = this.startLearningRate * Math.exp(trainingSetFactor / Math.floor(this.numIterations / this.trainingSet.length));
      }
    }

    this.iterationCount++;
    return true;
  } else {
    this.done = true;
    return false;
  }
};

SOM.prototype._adjust = function adjust(trainingValue, neighbourhoodRadius) {
  var now = Date.now(),
      x,
      y,
      dist,
      influence;

  var bmu = this._findBestMatchingUnit(trainingValue);

  var now2 = Date.now();
  this.times.findBMU += now2 - now;
  var radiusLimit = Math.floor(neighbourhoodRadius);
  var xMin = bmu.x - radiusLimit,
      xMax = bmu.x + radiusLimit,
      yMin = bmu.y - radiusLimit,
      yMax = bmu.y + radiusLimit;

  for (x = xMin; x <= xMax; x++) {
    var theX = x;

    if (x < 0) {
      theX += this.x;
    } else if (x >= this.x) {
      theX -= this.x;
    }

    for (y = yMin; y <= yMax; y++) {
      var theY = y;

      if (y < 0) {
        theY += this.y;
      } else if (y >= this.y) {
        theY -= this.y;
      }

      dist = bmu[this.distanceMethod](this.nodes[theX][theY]);

      if (dist < neighbourhoodRadius) {
        influence = Math.exp(-dist / (2 * neighbourhoodRadius));
        this.nodes[theX][theY].adjustWeights(trainingValue, this.learningRate, influence);
      }
    }
  }

  this.times.adjust += Date.now() - now2;
};

SOM.prototype.train = function train(trainingSet) {
  if (!this.done) {
    this.setTraining(trainingSet);

    while (this.trainOne()) {}
  }
};

SOM.prototype.getConvertedNodes = function getConvertedNodes() {
  var result = new Array(this.x);

  for (var i = 0; i < this.x; i++) {
    result[i] = new Array(this.y);

    for (var j = 0; j < this.y; j++) {
      var node = this.nodes[i][j];
      result[i][j] = this.creator ? this.creator(node.weights) : node.weights;
    }
  }

  return result;
};

SOM.prototype._findBestMatchingUnit = function findBestMatchingUnit(candidate) {
  var bmu,
      lowest = Infinity,
      dist;

  for (var i = 0; i < this.x; i++) {
    for (var j = 0; j < this.y; j++) {
      dist = this.distance(this.nodes[i][j].weights, candidate);

      if (dist < lowest) {
        lowest = dist;
        bmu = this.nodes[i][j];
      }
    }
  }

  return bmu;
};

SOM.prototype.predict = function predict(data, computePosition) {
  if (typeof data === 'boolean') {
    computePosition = data;
    data = null;
  }

  if (!data) {
    data = this.trainingSet;
  }

  if (Array.isArray(data) && (Array.isArray(data[0]) || typeof data[0] === 'object')) {
    // predict a dataset
    var self = this;
    return data.map(function (element) {
      return self._predict(element, computePosition);
    });
  } else {
    // predict a single element
    return this._predict(data, computePosition);
  }
};

SOM.prototype._predict = function _predict(element, computePosition) {
  if (!Array.isArray(element)) {
    element = this.extractor(element);
  }

  var bmu = this._findBestMatchingUnit(element);

  var result = [bmu.x, bmu.y];

  if (computePosition) {
    result[2] = bmu.getPosition(element);
  }

  return result;
}; // As seen in http://www.scholarpedia.org/article/Kohonen_network


SOM.prototype.getQuantizationError = function getQuantizationError() {
  var fit = this.getFit(),
      l = fit.length,
      sum = 0;

  for (var i = 0; i < l; i++) {
    sum += fit[i];
  }

  return sum / l;
};

SOM.prototype.getFit = function getFit(dataset) {
  if (!dataset) {
    dataset = this.trainingSet;
  }

  var l = dataset.length,
      bmu,
      result = new Array(l);

  for (var i = 0; i < l; i++) {
    bmu = this._findBestMatchingUnit(dataset[i]);
    result[i] = Math.sqrt(this.distance(dataset[i], bmu.weights));
  }

  return result;
};

function getConverters(fields) {
  var l = fields.length,
      normalizers = new Array(l),
      denormalizers = new Array(l);

  for (var i = 0; i < l; i++) {
    normalizers[i] = getNormalizer(fields[i].range);
    denormalizers[i] = getDenormalizer(fields[i].range);
  }

  return {
    extractor: function extractor(value) {
      var result = new Array(l);

      for (var i = 0; i < l; i++) {
        result[i] = normalizers[i](value[fields[i].name]);
      }

      return result;
    },
    creator: function creator(value) {
      var result = {};

      for (var i = 0; i < l; i++) {
        result[fields[i].name] = denormalizers[i](value[i]);
      }

      return result;
    }
  };
}

function getNormalizer(minMax) {
  return function normalizer(value) {
    return (value - minMax[0]) / (minMax[1] - minMax[0]);
  };
}

function getDenormalizer(minMax) {
  return function denormalizer(value) {
    return minMax[0] + value * (minMax[1] - minMax[0]);
  };
}

function squareEuclidean(a, b) {
  var d = 0;

  for (var i = 0, ii = a.length; i < ii; i++) {
    d += (a[i] - b[i]) * (a[i] - b[i]);
  }

  return d;
}

function getRandomValue(arr, randomizer) {
  return arr[Math.floor(randomizer() * arr.length)];
}

function getMaxDistance(distance, numWeights) {
  var zero = new Array(numWeights),
      one = new Array(numWeights);

  for (var i = 0; i < numWeights; i++) {
    zero[i] = 0;
    one[i] = 1;
  }

  return distance(zero, one);
}

module.exports = SOM;

/***/ }),
/* 70 */
/***/ (function(module, exports, __webpack_require__) {

var NodeSquare = __webpack_require__(29);

function NodeHexagonal(x, y, weights, som) {
  NodeSquare.call(this, x, y, weights, som);
  this.hX = x - Math.floor(y / 2);
  this.z = 0 - this.hX - y;
}

NodeHexagonal.prototype = new NodeSquare();
NodeHexagonal.prototype.constructor = NodeHexagonal;

NodeHexagonal.prototype.getDistance = function getDistanceHexagonal(otherNode) {
  return Math.max(Math.abs(this.hX - otherNode.hX), Math.abs(this.y - otherNode.y), Math.abs(this.z - otherNode.z));
};

NodeHexagonal.prototype.getDistanceTorus = function getDistanceTorus(otherNode) {
  var distX = Math.abs(this.hX - otherNode.hX),
      distY = Math.abs(this.y - otherNode.y),
      distZ = Math.abs(this.z - otherNode.z);
  return Math.max(Math.min(distX, this.som.gridDim.x - distX), Math.min(distY, this.som.gridDim.y - distY), Math.min(distZ, this.som.gridDim.z - distZ));
};

NodeHexagonal.prototype.getPosition = function getPosition() {
  throw new Error('Unimplemented : cannot get position of the points for hexagonal grid');
};

module.exports = NodeHexagonal;

/***/ }),
/* 71 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SparseMatrix", function() { return SparseMatrix; });
/* harmony import */ var ml_hash_table__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(14);
/* harmony import */ var ml_hash_table__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(ml_hash_table__WEBPACK_IMPORTED_MODULE_0__);

class SparseMatrix {
  constructor(rows, columns) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (rows instanceof SparseMatrix) {
      // clone
      const other = rows;

      this._init(other.rows, other.columns, other.elements.clone(), other.threshold);

      return;
    }

    if (Array.isArray(rows)) {
      const matrix = rows;
      rows = matrix.length;
      options = columns || {};
      columns = matrix[0].length;

      this._init(rows, columns, new ml_hash_table__WEBPACK_IMPORTED_MODULE_0___default.a(options), options.threshold);

      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          var value = matrix[i][j];
          if (this.threshold && Math.abs(value) < this.threshold) value = 0;

          if (value !== 0) {
            this.elements.set(i * columns + j, matrix[i][j]);
          }
        }
      }
    } else {
      this._init(rows, columns, new ml_hash_table__WEBPACK_IMPORTED_MODULE_0___default.a(options), options.threshold);
    }
  }

  _init(rows, columns, elements, threshold) {
    this.rows = rows;
    this.columns = columns;
    this.elements = elements;
    this.threshold = threshold || 0;
  }

  static eye() {
    let rows = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1;
    let columns = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : rows;
    const min = Math.min(rows, columns);
    const matrix = new SparseMatrix(rows, columns, {
      initialCapacity: min
    });

    for (var i = 0; i < min; i++) {
      matrix.set(i, i, 1);
    }

    return matrix;
  }

  clone() {
    return new SparseMatrix(this);
  }

  to2DArray() {
    const copy = new Array(this.rows);

    for (var i = 0; i < this.rows; i++) {
      copy[i] = new Array(this.columns);

      for (var j = 0; j < this.columns; j++) {
        copy[i][j] = this.get(i, j);
      }
    }

    return copy;
  }

  isSquare() {
    return this.rows === this.columns;
  }

  isSymmetric() {
    if (!this.isSquare()) return false;
    var symmetric = true;
    this.forEachNonZero((i, j, v) => {
      if (this.get(j, i) !== v) {
        symmetric = false;
        return false;
      }

      return v;
    });
    return symmetric;
  }
  /**
   * Search for the wither band in the main diagonals
   * @return {number}
   */


  bandWidth() {
    let min = this.columns;
    let max = -1;
    this.forEachNonZero((i, j, v) => {
      let diff = i - j;
      min = Math.min(min, diff);
      max = Math.max(max, diff);
      return v;
    });
    return max - min;
  }
  /**
   * Test if a matrix is consider banded using a threshold
   * @param {number} width
   * @return {boolean}
   */


  isBanded(width) {
    let bandWidth = this.bandWidth();
    return bandWidth <= width;
  }

  get cardinality() {
    return this.elements.size;
  }

  get size() {
    return this.rows * this.columns;
  }

  get(row, column) {
    return this.elements.get(row * this.columns + column);
  }

  set(row, column, value) {
    if (this.threshold && Math.abs(value) < this.threshold) value = 0;

    if (value === 0) {
      this.elements.remove(row * this.columns + column);
    } else {
      this.elements.set(row * this.columns + column, value);
    }

    return this;
  }

  mmul(other) {
    if (this.columns !== other.rows) {
      // eslint-disable-next-line no-console
      console.warn('Number of columns of left matrix are not equal to number of rows of right matrix.');
    }

    const m = this.rows;
    const p = other.columns;
    const result = new SparseMatrix(m, p);
    this.forEachNonZero((i, j, v1) => {
      other.forEachNonZero((k, l, v2) => {
        if (j === k) {
          result.set(i, l, result.get(i, l) + v1 * v2);
        }

        return v2;
      });
      return v1;
    });
    return result;
  }

  kroneckerProduct(other) {
    const m = this.rows;
    const n = this.columns;
    const p = other.rows;
    const q = other.columns;
    const result = new SparseMatrix(m * p, n * q, {
      initialCapacity: this.cardinality * other.cardinality
    });
    this.forEachNonZero((i, j, v1) => {
      other.forEachNonZero((k, l, v2) => {
        result.set(p * i + k, q * j + l, v1 * v2);
        return v2;
      });
      return v1;
    });
    return result;
  }

  forEachNonZero(callback) {
    this.elements.forEachPair((key, value) => {
      const i = key / this.columns | 0;
      const j = key % this.columns;
      let r = callback(i, j, value);
      if (r === false) return false; // stop iteration

      if (this.threshold && Math.abs(r) < this.threshold) r = 0;

      if (r !== value) {
        if (r === 0) {
          this.elements.remove(key, true);
        } else {
          this.elements.set(key, r);
        }
      }

      return true;
    });
    this.elements.maybeShrinkCapacity();
    return this;
  }

  getNonZeros() {
    const cardinality = this.cardinality;
    const rows = new Array(cardinality);
    const columns = new Array(cardinality);
    const values = new Array(cardinality);
    var idx = 0;
    this.forEachNonZero((i, j, value) => {
      rows[idx] = i;
      columns[idx] = j;
      values[idx] = value;
      idx++;
      return value;
    });
    return {
      rows,
      columns,
      values
    };
  }

  setThreshold(newThreshold) {
    if (newThreshold !== 0 && newThreshold !== this.threshold) {
      this.threshold = newThreshold;
      this.forEachNonZero((i, j, v) => v);
    }

    return this;
  }
  /**
   * @return {SparseMatrix} - New transposed sparse matrix
   */


  transpose() {
    let trans = new SparseMatrix(this.columns, this.rows, {
      initialCapacity: this.cardinality
    });
    this.forEachNonZero((i, j, value) => {
      trans.set(j, i, value);
      return value;
    });
    return trans;
  }

}
SparseMatrix.prototype.klass = 'Matrix';
SparseMatrix.identity = SparseMatrix.eye;
SparseMatrix.prototype.tensorProduct = SparseMatrix.prototype.kroneckerProduct;
/*
 Add dynamically instance and static methods for mathematical operations
 */

var inplaceOperator = "\n(function %name%(value) {\n    if (typeof value === 'number') return this.%name%S(value);\n    return this.%name%M(value);\n})\n";
var inplaceOperatorScalar = "\n(function %name%S(value) {\n    this.forEachNonZero((i, j, v) => v %op% value);\n    return this;\n})\n";
var inplaceOperatorMatrix = "\n(function %name%M(matrix) {\n    matrix.forEachNonZero((i, j, v) => {\n        this.set(i, j, this.get(i, j) %op% v);\n        return v;\n    });\n    return this;\n})\n";
var staticOperator = "\n(function %name%(matrix, value) {\n    var newMatrix = new SparseMatrix(matrix);\n    return newMatrix.%name%(value);\n})\n";
var inplaceMethod = "\n(function %name%() {\n    this.forEachNonZero((i, j, v) => %method%(v));\n    return this;\n})\n";
var staticMethod = "\n(function %name%(matrix) {\n    var newMatrix = new SparseMatrix(matrix);\n    return newMatrix.%name%();\n})\n";
const operators = [// Arithmetic operators
['+', 'add'], ['-', 'sub', 'subtract'], ['*', 'mul', 'multiply'], ['/', 'div', 'divide'], ['%', 'mod', 'modulus'], // Bitwise operators
['&', 'and'], ['|', 'or'], ['^', 'xor'], ['<<', 'leftShift'], ['>>', 'signPropagatingRightShift'], ['>>>', 'rightShift', 'zeroFillRightShift']];

for (const operator of operators) {
  for (let i = 1; i < operator.length; i++) {
    SparseMatrix.prototype[operator[i]] = eval(fillTemplateFunction(inplaceOperator, {
      name: operator[i],
      op: operator[0]
    }));
    SparseMatrix.prototype[operator[i] + 'S'] = eval(fillTemplateFunction(inplaceOperatorScalar, {
      name: operator[i] + 'S',
      op: operator[0]
    }));
    SparseMatrix.prototype[operator[i] + 'M'] = eval(fillTemplateFunction(inplaceOperatorMatrix, {
      name: operator[i] + 'M',
      op: operator[0]
    }));
    SparseMatrix[operator[i]] = eval(fillTemplateFunction(staticOperator, {
      name: operator[i]
    }));
  }
}

var methods = [['~', 'not']];
['abs', 'acos', 'acosh', 'asin', 'asinh', 'atan', 'atanh', 'cbrt', 'ceil', 'clz32', 'cos', 'cosh', 'exp', 'expm1', 'floor', 'fround', 'log', 'log1p', 'log10', 'log2', 'round', 'sign', 'sin', 'sinh', 'sqrt', 'tan', 'tanh', 'trunc'].forEach(function (mathMethod) {
  methods.push(['Math.' + mathMethod, mathMethod]);
});

for (const method of methods) {
  for (let i = 1; i < method.length; i++) {
    SparseMatrix.prototype[method[i]] = eval(fillTemplateFunction(inplaceMethod, {
      name: method[i],
      method: method[0]
    }));
    SparseMatrix[method[i]] = eval(fillTemplateFunction(staticMethod, {
      name: method[i]
    }));
  }
}

function fillTemplateFunction(template, values) {
  for (const i in values) {
    template = template.replace(new RegExp('%' + i + '%', 'g'), values[i]);
  }

  return template;
}

/***/ }),
/* 72 */
/***/ (function(module, exports) {

module.exports = newArray;

function newArray(n, value) {
  n = n || 0;
  var array = new Array(n);

  for (var i = 0; i < n; i++) {
    array[i] = value;
  }

  return array;
}

/***/ }),
/* 73 */
/***/ (function(module, exports, __webpack_require__) {

const binarySearch = __webpack_require__(6);

const sortAsc = __webpack_require__(7).asc;

const largestPrime = 0x7fffffff;
const primeNumbers = [//chunk #0
largestPrime, // 2^31-1
//chunk #1
5, 11, 23, 47, 97, 197, 397, 797, 1597, 3203, 6421, 12853, 25717, 51437, 102877, 205759, 411527, 823117, 1646237, 3292489, 6584983, 13169977, 26339969, 52679969, 105359939, 210719881, 421439783, 842879579, 1685759167, //chunk #2
433, 877, 1759, 3527, 7057, 14143, 28289, 56591, 113189, 226379, 452759, 905551, 1811107, 3622219, 7244441, 14488931, 28977863, 57955739, 115911563, 231823147, 463646329, 927292699, 1854585413, //chunk #3
953, 1907, 3821, 7643, 15287, 30577, 61169, 122347, 244703, 489407, 978821, 1957651, 3915341, 7830701, 15661423, 31322867, 62645741, 125291483, 250582987, 501165979, 1002331963, 2004663929, //chunk #4
1039, 2081, 4177, 8363, 16729, 33461, 66923, 133853, 267713, 535481, 1070981, 2141977, 4283963, 8567929, 17135863, 34271747, 68543509, 137087021, 274174111, 548348231, 1096696463, //chunk #5
31, 67, 137, 277, 557, 1117, 2237, 4481, 8963, 17929, 35863, 71741, 143483, 286973, 573953, 1147921, 2295859, 4591721, 9183457, 18366923, 36733847, 73467739, 146935499, 293871013, 587742049, 1175484103, //chunk #6
599, 1201, 2411, 4831, 9677, 19373, 38747, 77509, 155027, 310081, 620171, 1240361, 2480729, 4961459, 9922933, 19845871, 39691759, 79383533, 158767069, 317534141, 635068283, 1270136683, //chunk #7
311, 631, 1277, 2557, 5119, 10243, 20507, 41017, 82037, 164089, 328213, 656429, 1312867, 2625761, 5251529, 10503061, 21006137, 42012281, 84024581, 168049163, 336098327, 672196673, 1344393353, //chunk #8
3, 7, 17, 37, 79, 163, 331, 673, 1361, 2729, 5471, 10949, 21911, 43853, 87719, 175447, 350899, 701819, 1403641, 2807303, 5614657, 11229331, 22458671, 44917381, 89834777, 179669557, 359339171, 718678369, 1437356741, //chunk #9
43, 89, 179, 359, 719, 1439, 2879, 5779, 11579, 23159, 46327, 92657, 185323, 370661, 741337, 1482707, 2965421, 5930887, 11861791, 23723597, 47447201, 94894427, 189788857, 379577741, 759155483, 1518310967, //chunk #10
379, 761, 1523, 3049, 6101, 12203, 24407, 48817, 97649, 195311, 390647, 781301, 1562611, 3125257, 6250537, 12501169, 25002389, 50004791, 100009607, 200019221, 400038451, 800076929, 1600153859, //chunk #11
13, 29, 59, 127, 257, 521, 1049, 2099, 4201, 8419, 16843, 33703, 67409, 134837, 269683, 539389, 1078787, 2157587, 4315183, 8630387, 17260781, 34521589, 69043189, 138086407, 276172823, 552345671, 1104691373, //chunk #12
19, 41, 83, 167, 337, 677, 1361, 2729, 5471, 10949, 21911, 43853, 87719, 175447, 350899, 701819, 1403641, 2807303, 5614657, 11229331, 22458671, 44917381, 89834777, 179669557, 359339171, 718678369, 1437356741, //chunk #13
53, 107, 223, 449, 907, 1823, 3659, 7321, 14653, 29311, 58631, 117269, 234539, 469099, 938207, 1876417, 3752839, 7505681, 15011389, 30022781, 60045577, 120091177, 240182359, 480364727, 960729461, 1921458943];
primeNumbers.sort(sortAsc);

function nextPrime(value) {
  let index = binarySearch(primeNumbers, value, sortAsc);

  if (index < 0) {
    index = ~index;
  }

  return primeNumbers[index];
}

exports.nextPrime = nextPrime;
exports.largestPrime = largestPrime;

/***/ }),
/* 74 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = Number.isNaN || function (x) {
  return x !== x;
};

/***/ }),
/* 75 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.additiveSymmetric = __webpack_require__(76);
exports.avg = __webpack_require__(77);
exports.bhattacharyya = __webpack_require__(78);
exports.canberra = __webpack_require__(79);
exports.chebyshev = __webpack_require__(80);
exports.clark = __webpack_require__(81);
exports.czekanowski = __webpack_require__(82);
exports.dice = __webpack_require__(32);
exports.divergence = __webpack_require__(83);
exports.euclidean = __webpack_require__(2);
exports.fidelity = __webpack_require__(84);
exports.gower = __webpack_require__(85);
exports.harmonicMean = __webpack_require__(86);
exports.hellinger = __webpack_require__(87);
exports.innerProduct = __webpack_require__(88);
exports.intersection = __webpack_require__(33);
exports.jaccard = __webpack_require__(34);
exports.jeffreys = __webpack_require__(89);
exports.jensenDifference = __webpack_require__(90);
exports.jensenShannon = __webpack_require__(91);
exports.kdivergence = __webpack_require__(92);
exports.kulczynski = __webpack_require__(35);
exports.kullbackLeibler = __webpack_require__(93);
exports.kumarHassebrook = __webpack_require__(94);
exports.kumarJohnson = __webpack_require__(95);
exports.lorentzian = __webpack_require__(96);
exports.manhattan = __webpack_require__(97);
exports.matusita = __webpack_require__(98);
exports.minkowski = __webpack_require__(99);
exports.motyka = __webpack_require__(36);
exports.neyman = __webpack_require__(100);
exports.pearson = __webpack_require__(101);
exports.probabilisticSymmetric = __webpack_require__(102);
exports.ruzicka = __webpack_require__(103);
exports.soergel = __webpack_require__(104);
exports.sorensen = __webpack_require__(105);
exports.squared = __webpack_require__(106);
exports.squaredChord = __webpack_require__(37);
exports.squaredEuclidean = __webpack_require__(2).squared;
exports.taneja = __webpack_require__(107);
exports.tanimoto = __webpack_require__(108);
exports.topsoe = __webpack_require__(109);
exports.tree = __webpack_require__(110);
exports.waveHedges = __webpack_require__(111);

/***/ }),
/* 76 */
/***/ (function(module, exports) {

module.exports = function additiveSymmetric(a, b) {
  var i = 0,
      ii = a.length,
      d = 0;

  for (; i < ii; i++) {
    d += (a[i] - b[i]) * (a[i] - b[i]) * (a[i] + b[i]) / (a[i] * b[i]);
  }

  return 2 * d;
};

/***/ }),
/* 77 */
/***/ (function(module, exports) {

module.exports = function avg(a, b) {
  var ii = a.length,
      max = 0,
      ans = 0,
      aux = 0;

  for (var i = 0; i < ii; i++) {
    aux = Math.abs(a[i] - b[i]);
    ans += aux;

    if (max < aux) {
      max = aux;
    }
  }

  return (max + ans) / 2;
};

/***/ }),
/* 78 */
/***/ (function(module, exports) {

module.exports = function bhattacharyya(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += Math.sqrt(a[i] * b[i]);
  }

  return -Math.log(ans);
};

/***/ }),
/* 79 */
/***/ (function(module, exports) {

module.exports = function canberra(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += Math.abs(a[i] - b[i]) / (a[i] + b[i]);
  }

  return ans;
};

/***/ }),
/* 80 */
/***/ (function(module, exports) {

module.exports = function chebyshev(a, b) {
  var ii = a.length,
      max = 0,
      aux = 0;

  for (var i = 0; i < ii; i++) {
    aux = Math.abs(a[i] - b[i]);

    if (max < aux) {
      max = aux;
    }
  }

  return max;
};

/***/ }),
/* 81 */
/***/ (function(module, exports) {

module.exports = function clark(a, b) {
  var i = 0,
      ii = a.length,
      d = 0;

  for (; i < ii; i++) {
    d += Math.sqrt((a[i] - b[i]) * (a[i] - b[i]) / ((a[i] + b[i]) * (a[i] + b[i])));
  }

  return 2 * d;
};

/***/ }),
/* 82 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const czekanowskiSimilarity = __webpack_require__(31);

module.exports = function czekanowskiDistance(a, b) {
  return 1 - czekanowskiSimilarity(a, b);
};

/***/ }),
/* 83 */
/***/ (function(module, exports) {

module.exports = function divergence(a, b) {
  var i = 0,
      ii = a.length,
      d = 0;

  for (; i < ii; i++) {
    d += (a[i] - b[i]) * (a[i] - b[i]) / ((a[i] + b[i]) * (a[i] + b[i]));
  }

  return 2 * d;
};

/***/ }),
/* 84 */
/***/ (function(module, exports) {

module.exports = function fidelity(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += Math.sqrt(a[i] * b[i]);
  }

  return ans;
};

/***/ }),
/* 85 */
/***/ (function(module, exports) {

module.exports = function gower(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += Math.abs(a[i] - b[i]);
  }

  return ans / ii;
};

/***/ }),
/* 86 */
/***/ (function(module, exports) {

module.exports = function harmonicMean(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += a[i] * b[i] / (a[i] + b[i]);
  }

  return 2 * ans;
};

/***/ }),
/* 87 */
/***/ (function(module, exports) {

module.exports = function hellinger(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += Math.sqrt(a[i] * b[i]);
  }

  return 2 * Math.sqrt(1 - ans);
};

/***/ }),
/* 88 */
/***/ (function(module, exports) {

module.exports = function innerProduct(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += a[i] * b[i];
  }

  return ans;
};

/***/ }),
/* 89 */
/***/ (function(module, exports) {

module.exports = function jeffreys(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += (a[i] - b[i]) * Math.log(a[i] / b[i]);
  }

  return ans;
};

/***/ }),
/* 90 */
/***/ (function(module, exports) {

module.exports = function jensenDifference(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += (a[i] * Math.log(a[i]) + b[i] * Math.log(b[i])) / 2 - (a[i] + b[i]) / 2 * Math.log((a[i] + b[i]) / 2);
  }

  return ans;
};

/***/ }),
/* 91 */
/***/ (function(module, exports) {

module.exports = function jensenShannon(a, b) {
  var ii = a.length,
      p = 0,
      q = 0;

  for (var i = 0; i < ii; i++) {
    p += a[i] * Math.log(2 * a[i] / (a[i] + b[i]));
    q += b[i] * Math.log(2 * b[i] / (a[i] + b[i]));
  }

  return (p + q) / 2;
};

/***/ }),
/* 92 */
/***/ (function(module, exports) {

module.exports = function kdivergence(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += a[i] * Math.log(2 * a[i] / (a[i] + b[i]));
  }

  return ans;
};

/***/ }),
/* 93 */
/***/ (function(module, exports) {

module.exports = function kullbackLeibler(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += a[i] * Math.log(a[i] / b[i]);
  }

  return ans;
};

/***/ }),
/* 94 */
/***/ (function(module, exports) {

module.exports = function kumarHassebrook(a, b) {
  var ii = a.length,
      p = 0,
      p2 = 0,
      q2 = 0;

  for (var i = 0; i < ii; i++) {
    p += a[i] * b[i];
    p2 += a[i] * a[i];
    q2 += b[i] * b[i];
  }

  return p / (p2 + q2 - p);
};

/***/ }),
/* 95 */
/***/ (function(module, exports) {

module.exports = function kumarJohnson(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += Math.pow(a[i] * a[i] - b[i] * b[i], 2) / (2 * Math.pow(a[i] * b[i], 1.5));
  }

  return ans;
};

/***/ }),
/* 96 */
/***/ (function(module, exports) {

module.exports = function lorentzian(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += Math.log(Math.abs(a[i] - b[i]) + 1);
  }

  return ans;
};

/***/ }),
/* 97 */
/***/ (function(module, exports) {

module.exports = function manhattan(a, b) {
  var i = 0,
      ii = a.length,
      d = 0;

  for (; i < ii; i++) {
    d += Math.abs(a[i] - b[i]);
  }

  return d;
};

/***/ }),
/* 98 */
/***/ (function(module, exports) {

module.exports = function matusita(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += Math.sqrt(a[i] * b[i]);
  }

  return Math.sqrt(2 - 2 * ans);
};

/***/ }),
/* 99 */
/***/ (function(module, exports) {

module.exports = function minkowski(a, b, p) {
  var i = 0,
      ii = a.length,
      d = 0;

  for (; i < ii; i++) {
    d += Math.pow(Math.abs(a[i] - b[i]), p);
  }

  return Math.pow(d, 1 / p);
};

/***/ }),
/* 100 */
/***/ (function(module, exports) {

module.exports = function neyman(a, b) {
  var i = 0,
      ii = a.length,
      d = 0;

  for (; i < ii; i++) {
    d += (a[i] - b[i]) * (a[i] - b[i]) / a[i];
  }

  return d;
};

/***/ }),
/* 101 */
/***/ (function(module, exports) {

module.exports = function pearson(a, b) {
  var i = 0,
      ii = a.length,
      d = 0;

  for (; i < ii; i++) {
    d += (a[i] - b[i]) * (a[i] - b[i]) / b[i];
  }

  return d;
};

/***/ }),
/* 102 */
/***/ (function(module, exports) {

module.exports = function probabilisticSymmetric(a, b) {
  var i = 0,
      ii = a.length,
      d = 0;

  for (; i < ii; i++) {
    d += (a[i] - b[i]) * (a[i] - b[i]) / (a[i] + b[i]);
  }

  return 2 * d;
};

/***/ }),
/* 103 */
/***/ (function(module, exports) {

module.exports = function ruzicka(a, b) {
  var ii = a.length,
      up = 0,
      down = 0;

  for (var i = 0; i < ii; i++) {
    up += Math.min(a[i], b[i]);
    down += Math.max(a[i], b[i]);
  }

  return up / down;
};

/***/ }),
/* 104 */
/***/ (function(module, exports) {

module.exports = function soergel(a, b) {
  var ii = a.length,
      up = 0,
      down = 0;

  for (var i = 0; i < ii; i++) {
    up += Math.abs(a[i] - b[i]);
    down += Math.max(a[i], b[i]);
  }

  return up / down;
};

/***/ }),
/* 105 */
/***/ (function(module, exports) {

module.exports = function sorensen(a, b) {
  var ii = a.length,
      up = 0,
      down = 0;

  for (var i = 0; i < ii; i++) {
    up += Math.abs(a[i] - b[i]);
    down += a[i] + b[i];
  }

  return up / down;
};

/***/ }),
/* 106 */
/***/ (function(module, exports) {

module.exports = function squared(a, b) {
  var i = 0,
      ii = a.length,
      d = 0;

  for (; i < ii; i++) {
    d += (a[i] - b[i]) * (a[i] - b[i]) / (a[i] + b[i]);
  }

  return d;
};

/***/ }),
/* 107 */
/***/ (function(module, exports) {

module.exports = function taneja(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += (a[i] + b[i]) / 2 * Math.log((a[i] + b[i]) / (2 * Math.sqrt(a[i] * b[i])));
  }

  return ans;
};

/***/ }),
/* 108 */
/***/ (function(module, exports, __webpack_require__) {

var tanimotoS = __webpack_require__(38);

module.exports = function tanimoto(a, b, bitvector) {
  if (bitvector) return 1 - tanimotoS(a, b, bitvector);else {
    var ii = a.length,
        p = 0,
        q = 0,
        m = 0;

    for (var i = 0; i < ii; i++) {
      p += a[i];
      q += b[i];
      m += Math.min(a[i], b[i]);
    }

    return (p + q - 2 * m) / (p + q - m);
  }
};

/***/ }),
/* 109 */
/***/ (function(module, exports) {

module.exports = function topsoe(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += a[i] * Math.log(2 * a[i] / (a[i] + b[i])) + b[i] * Math.log(2 * b[i] / (a[i] + b[i]));
  }

  return ans;
};

/***/ }),
/* 110 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 * Function that creates the tree
 * @param {Array <number>} X - chemical shifts of the signal
 * @param {Array <number>} Y - intensity of the signal
 * @param {number} from - the low limit of x
 * @param {number} to - the top limit of x
 * @param {number} minWindow - smallest range to accept in x
 * @param {number} threshold - smallest range to accept in y
 * @returns {{sum: number, center: number, left: {json}, right: {json}}}
 * left and right have the same structure than the parent, or have a
 * undefined value if are leafs
 */

function createTree(X, Y, from, to, minWindow, threshold) {
  minWindow = minWindow || 0.16;
  threshold = threshold || 0.01;
  if (to - from < minWindow) return undefined;
  var sum = 0;

  for (var i = 0; X[i] < to; i++) {
    if (X[i] > from) sum += Y[i];
  }

  if (sum < threshold) {
    return undefined;
  }

  var center = 0;

  for (var j = 0; X[j] < to; j++) {
    if (X[i] > from) center += X[j] * Y[j];
  }

  center = center / sum;
  if (center - from < 10e-6 || to - center < 10e-6) return undefined;

  if (center - from < minWindow / 4) {
    return createTree(X, Y, center, to, minWindow, threshold);
  } else {
    if (to - center < minWindow / 4) {
      return createTree(X, Y, from, center, minWindow, threshold);
    } else {
      return {
        'sum': sum,
        'center': center,
        'left': createTree(X, Y, from, center, minWindow, threshold),
        'right': createTree(X, Y, center, to, minWindow, threshold)
      };
    }
  }
}
/**
 * Similarity between two nodes
 * @param {{sum: number, center: number, left: {json}, right: {json}}} a - tree A node
 * @param {{sum: number, center: number, left: {json}, right: {json}}} b - tree B node
 * @param {number} alpha - weights the relative importance of intensity vs. shift match
 * @param {number} beta - weights the relative importance of node matching and children matching
 * @param {number} gamma - controls the attenuation of the effect of chemical shift differences
 * @returns {number} similarity measure between tree nodes
 */


function S(a, b, alpha, beta, gamma) {
  if (a === undefined || b === undefined) {
    return 0;
  } else {
    var C = alpha * Math.min(a.sum, b.sum) / Math.max(a.sum, b.sum) + (1 - alpha) * Math.exp(-gamma * Math.abs(a.center - b.center));
  }

  return beta * C + (1 - beta) * (S(a.left, b.left, alpha, beta, gamma) + S(a.right, b.right, alpha, beta, gamma));
}
/**
 * @type {number} alpha - weights the relative importance of intensity vs. shift match
 * @type {number} beta - weights the relative importance of node matching and children matching
 * @type {number} gamma - controls the attenuation of the effect of chemical shift differences
 * @type {number} minWindow - smallest range to accept in x
 * @type {number} threshold - smallest range to accept in y
 */


var defaultOptions = {
  minWindow: 0.16,
  threshold: 0.01,
  alpha: 0.1,
  beta: 0.33,
  gamma: 0.001
};
/**
 * Builds a tree based in the spectra and compares this trees
 * @param {{x: Array<number>, y: Array<number>}} A - first spectra to be compared
 * @param {{x: Array<number>, y: Array<number>}} B - second spectra to be compared
 * @param {number} from - the low limit of x
 * @param {number} to - the top limit of x
 * @param {{minWindow: number, threshold: number, alpha: number, beta: number, gamma: number}} options
 * @returns {number} similarity measure between the spectra
 */

function tree(A, B, from, to, options) {
  options = options || {};

  for (var o in defaultOptions) if (!options.hasOwnProperty(o)) {
    options[o] = defaultOptions[o];
  }

  var Atree, Btree;
  if (A.sum) Atree = A;else Atree = createTree(A.x, A.y, from, to, options.minWindow, options.threshold);
  if (B.sum) Btree = B;else Btree = createTree(B.x, B.y, from, to, options.minWindow, options.threshold);
  return S(Atree, Btree, options.alpha, options.beta, options.gamma);
}

module.exports = {
  calc: tree,
  createTree: createTree
};

/***/ }),
/* 111 */
/***/ (function(module, exports) {

module.exports = function waveHedges(a, b) {
  var ii = a.length,
      ans = 0;

  for (var i = 0; i < ii; i++) {
    ans += 1 - Math.min(a[i], b[i]) / Math.max(a[i], b[i]);
  }

  return ans;
};

/***/ }),
/* 112 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.cosine = __webpack_require__(39);
exports.czekanowski = __webpack_require__(31);
exports.dice = __webpack_require__(113);
exports.intersection = __webpack_require__(114);
exports.jaccard = __webpack_require__(115);
exports.kulczynski = __webpack_require__(116);
exports.motyka = __webpack_require__(117);
exports.pearson = __webpack_require__(118);
exports.squaredChord = __webpack_require__(119);
exports.tanimoto = __webpack_require__(38);

/***/ }),
/* 113 */
/***/ (function(module, exports, __webpack_require__) {

var diceD = __webpack_require__(32);

module.exports = function dice(a, b) {
  return 1 - diceD(a, b);
};

/***/ }),
/* 114 */
/***/ (function(module, exports, __webpack_require__) {

var intersectionD = __webpack_require__(33);

module.exports = function intersection(a, b) {
  return 1 - intersectionD(a, b);
};

/***/ }),
/* 115 */
/***/ (function(module, exports, __webpack_require__) {

var jaccardD = __webpack_require__(34);

module.exports = function jaccard(a, b) {
  return 1 - jaccardD(a, b);
};

/***/ }),
/* 116 */
/***/ (function(module, exports, __webpack_require__) {

var kulczynskiD = __webpack_require__(35);

module.exports = function kulczynski(a, b) {
  return 1 / kulczynskiD(a, b);
};

/***/ }),
/* 117 */
/***/ (function(module, exports, __webpack_require__) {

var motykaD = __webpack_require__(36);

module.exports = function motyka(a, b) {
  return 1 - motykaD(a, b);
};

/***/ }),
/* 118 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var stat = __webpack_require__(3).array;

var cosine = __webpack_require__(39);

module.exports = function pearson(a, b) {
  var avgA = stat.mean(a);
  var avgB = stat.mean(b);
  var newA = new Array(a.length);
  var newB = new Array(b.length);

  for (var i = 0; i < newA.length; i++) {
    newA[i] = a[i] - avgA;
    newB[i] = b[i] - avgB;
  }

  return cosine(newA, newB);
};

/***/ }),
/* 119 */
/***/ (function(module, exports, __webpack_require__) {

var squaredChordD = __webpack_require__(37);

module.exports = function squaredChord(a, b) {
  return 1 - squaredChordD(a, b);
};

/***/ }),
/* 120 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const measures = __webpack_require__(121);

class Performance {
  /**
   *
   * @param prediction - The prediction matrix
   * @param target - The target matrix (values: truthy for same class, falsy for different class)
   * @param options
   *
   * @option    all    True if the entire matrix must be used. False to ignore the diagonal and lower part (default is false, for similarity/distance matrices)
   * @option    max    True if the max value corresponds to a perfect match (like in similarity matrices), false if it is the min value (default is false, like in distance matrices. All values will be multiplied by -1)
   */
  constructor(prediction, target, options) {
    options = options || {};

    if (prediction.length !== target.length || prediction[0].length !== target[0].length) {
      throw new Error('dimensions of prediction and target do not match');
    }

    const rows = prediction.length;
    const columns = prediction[0].length;
    const isDistance = !options.max;
    const predP = [];

    if (options.all) {
      for (var i = 0; i < rows; i++) {
        for (var j = 0; j < columns; j++) {
          predP.push({
            pred: prediction[i][j],
            targ: target[i][j]
          });
        }
      }
    } else {
      if (rows < 3 || rows !== columns) {
        throw new Error('When "all" option is false, the prediction matrix must be square and have at least 3 columns');
      }

      for (var i = 0; i < rows - 1; i++) {
        for (var j = i + 1; j < columns; j++) {
          predP.push({
            pred: prediction[i][j],
            targ: target[i][j]
          });
        }
      }
    }

    if (isDistance) {
      predP.sort((a, b) => a.pred - b.pred);
    } else {
      predP.sort((a, b) => b.pred - a.pred);
    }

    const cutoffs = this.cutoffs = [isDistance ? Number.MIN_VALUE : Number.MAX_VALUE];
    const fp = this.fp = [0];
    const tp = this.tp = [0];
    var nPos = 0;
    var nNeg = 0;
    var currentPred = predP[0].pred;
    var nTp = 0;
    var nFp = 0;

    for (var i = 0; i < predP.length; i++) {
      if (predP[i].pred !== currentPred) {
        cutoffs.push(currentPred);
        fp.push(nFp);
        tp.push(nTp);
        currentPred = predP[i].pred;
      }

      if (predP[i].targ) {
        nPos++;
        nTp++;
      } else {
        nNeg++;
        nFp++;
      }
    }

    cutoffs.push(currentPred);
    fp.push(nFp);
    tp.push(nTp);
    const l = cutoffs.length;
    const fn = this.fn = new Array(l);
    const tn = this.tn = new Array(l);
    const nPosPred = this.nPosPred = new Array(l);
    const nNegPred = this.nNegPred = new Array(l);

    for (var i = 0; i < l; i++) {
      fn[i] = nPos - tp[i];
      tn[i] = nNeg - fp[i];
      nPosPred[i] = tp[i] + fp[i];
      nNegPred[i] = tn[i] + fn[i];
    }

    this.nPos = nPos;
    this.nNeg = nNeg;
    this.nSamples = nPos + nNeg;
  }
  /**
   * Computes a measure from the prediction object.
   *
   * Many measures are available and can be combined :
   * To create a ROC curve, you need fpr and tpr
   * To create a DET curve, you need fnr and fpr
   * To create a Lift chart, you need rpp and lift
   *
   * Possible measures are : threshold (Threshold), acc (Accuracy), err (Error rate),
   * fpr (False positive rate), tpr (True positive rate), fnr (False negative rate), tnr (True negative rate), ppv (Positive predictive value),
   * npv (Negative predictive value), pcfall (Prediction-conditioned fallout), pcmiss (Prediction-conditioned miss), lift (Lift value), rpp (Rate of positive predictions), rnp (Rate of negative predictions)
   *
   * @param measure - The short name of the measure
   *
   * @return [number]
   */


  getMeasure(measure) {
    if (typeof measure !== 'string') {
      throw new Error('No measure specified');
    }

    if (!measures[measure]) {
      throw new Error("The specified measure (".concat(measure, ") does not exist"));
    }

    return measures[measure](this);
  }
  /**
   * Returns the area under the ROC curve
   */


  getAURC() {
    const l = this.cutoffs.length;
    const x = new Array(l);
    const y = new Array(l);

    for (var i = 0; i < l; i++) {
      x[i] = this.fp[i] / this.nNeg;
      y[i] = this.tp[i] / this.nPos;
    }

    var auc = 0;

    for (i = 1; i < l; i++) {
      auc += 0.5 * (x[i] - x[i - 1]) * (y[i] + y[i - 1]);
    }

    return auc;
  }
  /**
   * Returns the area under the DET curve
   */


  getAUDC() {
    const l = this.cutoffs.length;
    const x = new Array(l);
    const y = new Array(l);

    for (var i = 0; i < l; i++) {
      x[i] = this.fn[i] / this.nPos;
      y[i] = this.fp[i] / this.nNeg;
    }

    var auc = 0;

    for (i = 1; i < l; i++) {
      auc += 0.5 * (x[i] + x[i - 1]) * (y[i] - y[i - 1]);
    }

    return auc;
  }

  getDistribution(options) {
    options = options || {};
    var cutLength = this.cutoffs.length;
    var cutLow = options.xMin || Math.floor(this.cutoffs[cutLength - 1] * 100) / 100;
    var cutHigh = options.xMax || Math.ceil(this.cutoffs[1] * 100) / 100;
    var interval = options.interval || Math.floor((cutHigh - cutLow) / 20 * 10000000 - 1) / 10000000; // Trick to avoid the precision problem of float numbers

    var xLabels = [];
    var interValues = [];
    var intraValues = [];
    var interCumPercent = [];
    var intraCumPercent = [];
    var nTP = this.tp[cutLength - 1],
        currentTP = 0;
    var nFP = this.fp[cutLength - 1],
        currentFP = 0;

    for (var i = cutLow, j = cutLength - 1; i <= cutHigh; i += interval) {
      while (this.cutoffs[j] < i) j--;

      xLabels.push(i);
      var thisTP = nTP - currentTP - this.tp[j];
      var thisFP = nFP - currentFP - this.fp[j];
      currentTP += thisTP;
      currentFP += thisFP;
      interValues.push(thisFP);
      intraValues.push(thisTP);
      interCumPercent.push(100 - (nFP - this.fp[j]) / nFP * 100);
      intraCumPercent.push(100 - (nTP - this.tp[j]) / nTP * 100);
    }

    return {
      xLabels: xLabels,
      interValues: interValues,
      intraValues: intraValues,
      interCumPercent: interCumPercent,
      intraCumPercent: intraCumPercent
    };
  }

}

Performance.names = {
  acc: 'Accuracy',
  err: 'Error rate',
  fpr: 'False positive rate',
  tpr: 'True positive rate',
  fnr: 'False negative rate',
  tnr: 'True negative rate',
  ppv: 'Positive predictive value',
  npv: 'Negative predictive value',
  pcfall: 'Prediction-conditioned fallout',
  pcmiss: 'Prediction-conditioned miss',
  lift: 'Lift value',
  rpp: 'Rate of positive predictions',
  rnp: 'Rate of negative predictions',
  threshold: 'Threshold'
};
module.exports = Performance;

/***/ }),
/* 121 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
 // Accuracy

exports.acc = pred => {
  const l = pred.cutoffs.length;
  const result = new Array(l);

  for (var i = 0; i < l; i++) {
    result[i] = (pred.tn[i] + pred.tp[i]) / (l - 1);
  }

  return result;
}; // Error rate


exports.err = pred => {
  const l = pred.cutoffs.length;
  const result = new Array(l);

  for (var i = 0; i < l; i++) {
    result[i] = pred.fn[i] + pred.fp[i] / (l - 1);
  }

  return result;
}; // False positive rate


exports.fpr = pred => {
  const l = pred.cutoffs.length;
  const result = new Array(l);

  for (var i = 0; i < l; i++) {
    result[i] = pred.fp[i] / pred.nNeg;
  }

  return result;
}; // True positive rate


exports.tpr = pred => {
  const l = pred.cutoffs.length;
  const result = new Array(l);

  for (var i = 0; i < l; i++) {
    result[i] = pred.tp[i] / pred.nPos;
  }

  return result;
}; // False negative rate


exports.fnr = pred => {
  const l = pred.cutoffs.length;
  const result = new Array(l);

  for (var i = 0; i < l; i++) {
    result[i] = pred.fn[i] / pred.nPos;
  }

  return result;
}; // True negative rate


exports.tnr = pred => {
  const l = pred.cutoffs.length;
  const result = new Array(l);

  for (var i = 0; i < l; i++) {
    result[i] = pred.tn[i] / pred.nNeg;
  }

  return result;
}; // Positive predictive value


exports.ppv = pred => {
  const l = pred.cutoffs.length;
  const result = new Array(l);

  for (var i = 0; i < l; i++) {
    result[i] = pred.fp[i] + pred.tp[i] !== 0 ? pred.tp[i] / (pred.fp[i] + pred.tp[i]) : 0;
  }

  return result;
}; // Negative predictive value


exports.npv = pred => {
  const l = pred.cutoffs.length;
  const result = new Array(l);

  for (var i = 0; i < l; i++) {
    result[i] = pred.fn[i] + pred.tn[i] !== 0 ? pred.tn[i] / (pred.fn[i] + pred.tn[i]) : 0;
  }

  return result;
}; // Prediction conditioned fallout


exports.pcfall = pred => {
  const l = pred.cutoffs.length;
  const result = new Array(l);

  for (var i = 0; i < l; i++) {
    result[i] = pred.fp[i] + pred.tp[i] !== 0 ? 1 - pred.tp[i] / (pred.fp[i] + pred.tp[i]) : 1;
  }

  return result;
}; // Prediction conditioned miss


exports.pcmiss = pred => {
  const l = pred.cutoffs.length;
  const result = new Array(l);

  for (var i = 0; i < l; i++) {
    result[i] = pred.fn[i] + pred.tn[i] !== 0 ? 1 - pred.tn[i] / (pred.fn[i] + pred.tn[i]) : 1;
  }

  return result;
}; // Lift value


exports.lift = pred => {
  const l = pred.cutoffs.length;
  const result = new Array(l);

  for (var i = 0; i < l; i++) {
    result[i] = pred.nPosPred[i] !== 0 ? pred.tp[i] / pred.nPos / (pred.nPosPred[i] / pred.nSamples) : 0;
  }

  return result;
}; // Rate of positive predictions


exports.rpp = pred => {
  const l = pred.cutoffs.length;
  const result = new Array(l);

  for (var i = 0; i < l; i++) {
    result[i] = pred.nPosPred[i] / pred.nSamples;
  }

  return result;
}; // Rate of negative predictions


exports.rnp = pred => {
  const l = pred.cutoffs.length;
  const result = new Array(l);

  for (var i = 0; i < l; i++) {
    result[i] = pred.nNegPred[i] / pred.nSamples;
  }

  return result;
}; // Threshold


exports.threshold = pred => {
  const clone = pred.cutoffs.slice();
  clone[0] = clone[1]; // Remove the infinite value

  return clone;
};

/***/ }),
/* 122 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var matrixLib = __webpack_require__(0);

var Matrix = matrixLib.Matrix;
var inverse = matrixLib.inverse;

var padArray = __webpack_require__(40);

var extend = __webpack_require__(16);

var defaultOptions = {
  windowSize: 5,
  derivative: 1,
  polynomial: 2,
  pad: 'none',
  padValue: 'replicate'
};
/**
 * Savitzky-Golay filter
 * @param {Array <number>} data
 * @param {number} h
 * @param {Object} options
 * @returns {Array}
 */

function SavitzkyGolay(data, h, options) {
  options = extend({}, defaultOptions, options);
  if (options.windowSize % 2 === 0 || options.windowSize < 5 || !Number.isInteger(options.windowSize)) throw new RangeError('Invalid window size (should be odd and at least 5 integer number)');
  if (options.derivative < 0 || !Number.isInteger(options.derivative)) throw new RangeError('Derivative should be a positive integer');
  if (options.polynomial < 1 || !Number.isInteger(options.polynomial)) throw new RangeError('Polynomial should be a positive integer');
  var C, norm;
  var step = Math.floor(options.windowSize / 2);

  if (options.pad === 'pre') {
    data = padArray(data, {
      size: step,
      value: options.padValue
    });
  }

  var ans = new Array(data.length - 2 * step);

  if (options.windowSize === 5 && options.polynomial === 2 && (options.derivative === 1 || options.derivative === 2)) {
    if (options.derivative === 1) {
      C = [-2, -1, 0, 1, 2];
      norm = 10;
    } else {
      C = [2, -1, -2, -1, 2];
      norm = 7;
    }
  } else {
    var J = Matrix.ones(options.windowSize, options.polynomial + 1);
    var inic = -(options.windowSize - 1) / 2;

    for (var i = 0; i < J.length; i++) {
      for (var j = 0; j < J[i].length; j++) {
        if (inic + 1 !== 0 || j !== 0) J[i][j] = Math.pow(inic + i, j);
      }
    }

    var Jtranspose = J.transposeView();
    var Jinv = inverse(Jtranspose.mmul(J));
    C = Jinv.mmul(Jtranspose);
    C = C[options.derivative];
    norm = 1;
  }

  var det = norm * Math.pow(h, options.derivative);

  for (var k = step; k < data.length - step; k++) {
    var d = 0;

    for (var l = 0; l < C.length; l++) d += C[l] * data[l + k - step] / det;

    ans[k - step] = d;
  }

  if (options.pad === 'post') {
    ans = padArray(ans, {
      size: step,
      value: options.padValue
    });
  }

  return ans;
}

module.exports = SavitzkyGolay;

/***/ }),
/* 123 */
/***/ (function(module, exports, __webpack_require__) {

//Code translate from Pascal source in http://pubs.acs.org/doi/pdf/10.1021/ac00205a007
var extend = __webpack_require__(16);

var stat = __webpack_require__(3);

var defaultOptions = {
  windowSize: 9,
  derivative: 0,
  polynomial: 3
};

function SavitzkyGolay(data, h, options) {
  options = extend({}, defaultOptions, options);
  if (options.windowSize % 2 === 0 || options.windowSize < 5 || !Number.isInteger(options.windowSize)) throw new RangeError('Invalid window size (should be odd and at least 5 integer number)');
  if (options.windowSize > data.length) throw new RangeError('Window size is higher than the data length ' + options.windowSize + ">" + data.length);
  if (options.derivative < 0 || !Number.isInteger(options.derivative)) throw new RangeError('Derivative should be a positive integer');
  if (options.polynomial < 1 || !Number.isInteger(options.polynomial)) throw new RangeError('Polynomial should be a positive integer');
  if (options.polynomial >= 6) console.warn('You should not use polynomial grade higher than 5 if you are' + ' not sure that your data arises from such a model. Possible polynomial oscillation problems');
  var windowSize = options.windowSize;
  var half = Math.floor(windowSize / 2);
  var np = data.length;
  var ans = new Array(np);
  var weights = fullWeights(windowSize, options.polynomial, options.derivative);
  var hs = 0;
  var constantH = true;

  if (Object.prototype.toString.call(h) === '[object Array]') {
    constantH = false;
  } else {
    hs = Math.pow(h, options.derivative);
  } //console.log("Constant h: "+constantH);
  //For the borders


  for (var i = 0; i < half; i++) {
    var wg1 = weights[half - i - 1];
    var wg2 = weights[half + i + 1];
    var d1 = 0,
        d2 = 0;

    for (var l = 0; l < windowSize; l++) {
      d1 += wg1[l] * data[l];
      d2 += wg2[l] * data[np - windowSize + l - 1];
    }

    if (constantH) {
      ans[half - i - 1] = d1 / hs;
      ans[np - half + i] = d2 / hs;
    } else {
      hs = getHs(h, half - i - 1, half, options.derivative);
      ans[half - i - 1] = d1 / hs;
      hs = getHs(h, np - half + i, half, options.derivative);
      ans[np - half + i] = d2 / hs;
    }
  } //For the internal points


  var wg = weights[half];

  for (var i = windowSize; i < np + 1; i++) {
    var d = 0;

    for (var l = 0; l < windowSize; l++) d += wg[l] * data[l + i - windowSize];

    if (!constantH) hs = getHs(h, i - half - 1, half, options.derivative);
    ans[i - half - 1] = d / hs;
  }

  return ans;
}

function getHs(h, center, half, derivative) {
  var hs = 0;
  var count = 0;

  for (var i = center - half; i < center + half; i++) {
    if (i >= 0 && i < h.length - 1) {
      hs += h[i + 1] - h[i];
      count++;
    }
  }

  return Math.pow(hs / count, derivative);
}

function GramPoly(i, m, k, s) {
  var Grampoly = 0;

  if (k > 0) {
    Grampoly = (4 * k - 2) / (k * (2 * m - k + 1)) * (i * GramPoly(i, m, k - 1, s) + s * GramPoly(i, m, k - 1, s - 1)) - (k - 1) * (2 * m + k) / (k * (2 * m - k + 1)) * GramPoly(i, m, k - 2, s);
  } else {
    if (k == 0 && s == 0) {
      Grampoly = 1;
    } else {
      Grampoly = 0;
    }
  } //console.log(Grampoly);


  return Grampoly;
}

function GenFact(a, b) {
  var gf = 1;

  if (a >= b) {
    for (var j = a - b + 1; j <= a; j++) {
      gf *= j;
    }
  }

  return gf;
}

function Weight(i, t, m, n, s) {
  var sum = 0;

  for (var k = 0; k <= n; k++) {
    //console.log(k);
    sum += (2 * k + 1) * (GenFact(2 * m, k) / GenFact(2 * m + k + 1, k + 1)) * GramPoly(i, m, k, 0) * GramPoly(t, m, k, s);
  }

  return sum;
}
/**
 *
 * @param m  Number of points
 * @param n  Polynomial grade
 * @param s  Derivative
 */


function fullWeights(m, n, s) {
  var weights = new Array(m);
  var np = Math.floor(m / 2);

  for (var t = -np; t <= np; t++) {
    weights[t + np] = new Array(m);

    for (var j = -np; j <= np; j++) {
      weights[t + np][j + np] = Weight(j, t, np, n, s);
    }
  }

  return weights;
}
/*function entropy(data,h,options){
    var trend = SavitzkyGolay(data,h,trendOptions);
    var copy = new Array(data.length);
    var sum = 0;
    var max = 0;
    for(var i=0;i<data.length;i++){
        copy[i] = data[i]-trend[i];
    }

    sum/=data.length;
    console.log(sum+" "+max);
    console.log(stat.array.standardDeviation(copy));
    console.log(Math.abs(stat.array.mean(copy))/stat.array.standardDeviation(copy));
    return sum;

}



function guessWindowSize(data, h){
    console.log("entropy "+entropy(data,h,trendOptions));
    return 5;
}
*/


module.exports = SavitzkyGolay;

/***/ }),
/* 124 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var eightBits = __webpack_require__(125);
/**
 * Count the number of true values in an array
 * @param {Array} arr
 * @return {number}
 */


function count(arr) {
  var c = 0;

  for (var i = 0; i < arr.length; i++) {
    c += eightBits[arr[i] & 0xff] + eightBits[arr[i] >> 8 & 0xff] + eightBits[arr[i] >> 16 & 0xff] + eightBits[arr[i] >> 24 & 0xff];
  }

  return c;
}
/**
 * Logical AND operation
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */


function and(arr1, arr2) {
  var ans = new Array(arr1.length);

  for (var i = 0; i < arr1.length; i++) ans[i] = arr1[i] & arr2[i];

  return ans;
}
/**
 * Logical OR operation
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */


function or(arr1, arr2) {
  var ans = new Array(arr1.length);

  for (var i = 0; i < arr1.length; i++) ans[i] = arr1[i] | arr2[i];

  return ans;
}
/**
 * Logical XOR operation
 * @param {Array} arr1
 * @param {Array} arr2
 * @return {Array}
 */


function xor(arr1, arr2) {
  var ans = new Array(arr1.length);

  for (var i = 0; i < arr1.length; i++) ans[i] = arr1[i] ^ arr2[i];

  return ans;
}
/**
 * Logical NOT operation
 * @param {Array} arr
 * @return {Array}
 */


function not(arr) {
  var ans = new Array(arr.length);

  for (var i = 0; i < ans.length; i++) ans[i] = ~arr[i];

  return ans;
}
/**
 * Gets the n value of array arr
 * @param {Array} arr
 * @param {number} n
 * @return {boolean}
 */


function getBit(arr, n) {
  var index = n >> 5; // Same as Math.floor(n/32)

  var mask = 1 << 31 - n % 32;
  return Boolean(arr[index] & mask);
}
/**
 * Sets the n value of array arr to the value val
 * @param {Array} arr
 * @param {number} n
 * @param {boolean} val
 * @return {Array}
 */


function setBit(arr, n, val) {
  var index = n >> 5; // Same as Math.floor(n/32)

  var mask = 1 << 31 - n % 32;
  if (val) arr[index] = mask | arr[index];else arr[index] = ~mask & arr[index];
  return arr;
}
/**
 * Translates an array of numbers to a string of bits
 * @param {Array} arr
 * @returns {string}
 */


function toBinaryString(arr) {
  var str = '';

  for (var i = 0; i < arr.length; i++) {
    var obj = (arr[i] >>> 0).toString(2);
    str += '00000000000000000000000000000000'.substr(obj.length) + obj;
  }

  return str;
}
/**
 * Creates an array of numbers based on a string of bits
 * @param {string} str
 * @returns {Array}
 */


function parseBinaryString(str) {
  var len = str.length / 32;
  var ans = new Array(len);

  for (var i = 0; i < len; i++) {
    ans[i] = parseInt(str.substr(i * 32, 32), 2) | 0;
  }

  return ans;
}
/**
 * Translates an array of numbers to a hex string
 * @param {Array} arr
 * @returns {string}
 */


function toHexString(arr) {
  var str = '';

  for (var i = 0; i < arr.length; i++) {
    var obj = (arr[i] >>> 0).toString(16);
    str += '00000000'.substr(obj.length) + obj;
  }

  return str;
}
/**
 * Creates an array of numbers based on a hex string
 * @param {string} str
 * @returns {Array}
 */


function parseHexString(str) {
  var len = str.length / 8;
  var ans = new Array(len);

  for (var i = 0; i < len; i++) {
    ans[i] = parseInt(str.substr(i * 8, 8), 16) | 0;
  }

  return ans;
}
/**
 * Creates a human readable string of the array
 * @param {Array} arr
 * @returns {string}
 */


function toDebug(arr) {
  var binary = toBinaryString(arr);
  var str = '';

  for (var i = 0; i < arr.length; i++) {
    str += '0000'.substr((i * 32).toString(16).length) + (i * 32).toString(16) + ':';

    for (var j = 0; j < 32; j += 4) {
      str += ' ' + binary.substr(i * 32 + j, 4);
    }

    if (i < arr.length - 1) str += '\n';
  }

  return str;
}

module.exports = {
  count: count,
  and: and,
  or: or,
  xor: xor,
  not: not,
  getBit: getBit,
  setBit: setBit,
  toBinaryString: toBinaryString,
  parseBinaryString: parseBinaryString,
  toHexString: toHexString,
  parseHexString: parseHexString,
  toDebug: toDebug
};

/***/ }),
/* 125 */
/***/ (function(module, exports) {

// auxiliary file to create the 256 look at table elements
var ans = new Array(256);

for (var i = 0; i < 256; i++) {
  var num = i;
  var c = 0;

  while (num) {
    num = num & num - 1;
    c++;
  }

  ans[i] = c;
}

module.exports = ans;

/***/ }),
/* 126 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = exports = __webpack_require__(127);
exports.getEquallySpacedData = __webpack_require__(128).getEquallySpacedData;
exports.SNV = __webpack_require__(129).SNV;

/***/ }),
/* 127 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


const Stat = __webpack_require__(3).array;
/**
 * Function that returns an array of points given 1D array as follows:
 *
 * [x1, y1, .. , x2, y2, ..]
 *
 * And receive the number of dimensions of each point.
 * @param array
 * @param dimensions
 * @returns {Array} - Array of points.
 */


function coordArrayToPoints(array, dimensions) {
  if (array.length % dimensions !== 0) {
    throw new RangeError('Dimensions number must be accordance with the size of the array.');
  }

  var length = array.length / dimensions;
  var pointsArr = new Array(length);
  var k = 0;

  for (var i = 0; i < array.length; i += dimensions) {
    var point = new Array(dimensions);

    for (var j = 0; j < dimensions; ++j) {
      point[j] = array[i + j];
    }

    pointsArr[k] = point;
    k++;
  }

  return pointsArr;
}
/**
 * Function that given an array as follows:
 * [x1, y1, .. , x2, y2, ..]
 *
 * Returns an array as follows:
 * [[x1, x2, ..], [y1, y2, ..], [ .. ]]
 *
 * And receives the number of dimensions of each coordinate.
 * @param array
 * @param dimensions
 * @returns {Array} - Matrix of coordinates
 */


function coordArrayToCoordMatrix(array, dimensions) {
  if (array.length % dimensions !== 0) {
    throw new RangeError('Dimensions number must be accordance with the size of the array.');
  }

  var coordinatesArray = new Array(dimensions);
  var points = array.length / dimensions;

  for (var i = 0; i < coordinatesArray.length; i++) {
    coordinatesArray[i] = new Array(points);
  }

  for (i = 0; i < array.length; i += dimensions) {
    for (var j = 0; j < dimensions; ++j) {
      var currentPoint = Math.floor(i / dimensions);
      coordinatesArray[j][currentPoint] = array[i + j];
    }
  }

  return coordinatesArray;
}
/**
 * Function that receives a coordinate matrix as follows:
 * [[x1, x2, ..], [y1, y2, ..], [ .. ]]
 *
 * Returns an array of coordinates as follows:
 * [x1, y1, .. , x2, y2, ..]
 *
 * @param coordMatrix
 * @returns {Array}
 */


function coordMatrixToCoordArray(coordMatrix) {
  var coodinatesArray = new Array(coordMatrix.length * coordMatrix[0].length);
  var k = 0;

  for (var i = 0; i < coordMatrix[0].length; ++i) {
    for (var j = 0; j < coordMatrix.length; ++j) {
      coodinatesArray[k] = coordMatrix[j][i];
      ++k;
    }
  }

  return coodinatesArray;
}
/**
 * Tranpose a matrix, this method is for coordMatrixToPoints and
 * pointsToCoordMatrix, that because only transposing the matrix
 * you can change your representation.
 *
 * @param matrix
 * @returns {Array}
 */


function transpose(matrix) {
  var resultMatrix = new Array(matrix[0].length);

  for (var i = 0; i < resultMatrix.length; ++i) {
    resultMatrix[i] = new Array(matrix.length);
  }

  for (i = 0; i < matrix.length; ++i) {
    for (var j = 0; j < matrix[0].length; ++j) {
      resultMatrix[j][i] = matrix[i][j];
    }
  }

  return resultMatrix;
}
/**
 * Function that transform an array of points into a coordinates array
 * as follows:
 * [x1, y1, .. , x2, y2, ..]
 *
 * @param points
 * @returns {Array}
 */


function pointsToCoordArray(points) {
  var coodinatesArray = new Array(points.length * points[0].length);
  var k = 0;

  for (var i = 0; i < points.length; ++i) {
    for (var j = 0; j < points[0].length; ++j) {
      coodinatesArray[k] = points[i][j];
      ++k;
    }
  }

  return coodinatesArray;
}
/**
 * Apply the dot product between the smaller vector and a subsets of the
 * largest one.
 *
 * @param firstVector
 * @param secondVector
 * @returns {Array} each dot product of size of the difference between the
 *                  larger and the smallest one.
 */


function applyDotProduct(firstVector, secondVector) {
  var largestVector, smallestVector;

  if (firstVector.length <= secondVector.length) {
    smallestVector = firstVector;
    largestVector = secondVector;
  } else {
    smallestVector = secondVector;
    largestVector = firstVector;
  }

  var difference = largestVector.length - smallestVector.length + 1;
  var dotProductApplied = new Array(difference);

  for (var i = 0; i < difference; ++i) {
    var sum = 0;

    for (var j = 0; j < smallestVector.length; ++j) {
      sum += smallestVector[j] * largestVector[i + j];
    }

    dotProductApplied[i] = sum;
  }

  return dotProductApplied;
}
/**
 * To scale the input array between the specified min and max values. The operation is performed inplace
 * if the options.inplace is specified. If only one of the min or max parameters is specified, then the scaling
 * will multiply the input array by min/min(input) or max/max(input)
 * @param input
 * @param options
 * @returns {*}
 */


function scale(input) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    min,
    max
  } = options;
  var y = options.inPlace ? input : new Array(input.length);
  var minMax = Stat.minMax(input);

  if (typeof max === 'number') {
    if (typeof min === 'number') {
      let factor = (max - min) / (minMax.max - minMax.min);

      for (let i = 0; i < y.length; i++) {
        y[i] = (input[i] - minMax.min) * factor + min;
      }
    } else if (minMax.max !== 0) {
      let factor = max / minMax.max;

      for (let i = 0; i < y.length; i++) {
        y[i] = input[i] * factor;
      }
    } else {
      options.min = minMax.min;
      y = scale(input, options);
    }
  } else if (typeof min === 'number') {
    if (minMax.min !== 0) {
      let factor = min / minMax.min;

      for (let i = 0; i < y.length; i++) {
        y[i] = input[i] * factor;
      }
    } else {
      options.max = minMax.max;
      y = scale(input, options);
    }
  }

  return y;
}

module.exports = {
  coordArrayToPoints: coordArrayToPoints,
  coordArrayToCoordMatrix: coordArrayToCoordMatrix,
  coordMatrixToCoordArray: coordMatrixToCoordArray,
  coordMatrixToPoints: transpose,
  pointsToCoordArray: pointsToCoordArray,
  pointsToCoordMatrix: transpose,
  applyDotProduct: applyDotProduct,
  scale: scale
};

/***/ }),
/* 128 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/**
 *
 * Function that returns a Number array of equally spaced numberOfPoints
 * containing a representation of intensities of the spectra arguments x
 * and y.
 *
 * The options parameter contains an object in the following form:
 * from: starting point
 * to: last point
 * numberOfPoints: number of points between from and to
 * variant: "slot" or "smooth" - smooth is the default option
 *
 * The slot variant consist that each point in the new array is calculated
 * averaging the existing points between the slot that belongs to the current
 * value. The smooth variant is the same but takes the integral of the range
 * of the slot and divide by the step size between two points in the new array.
 *
 * @param x - sorted increasing x values
 * @param y
 * @param options
 * @returns {Array} new array with the equally spaced data.
 *
 */

function getEquallySpacedData(x, y) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var xLength = x.length;

  if (x.length > 1 && x[0] > x[1]) {
    x = x.slice().reverse();
    y = y.slice().reverse();
  }

  var {
    from = x[0],
    to = x[xLength - 1],
    variant = 'smooth',
    numberOfPoints = 100
  } = options;

  if (xLength !== y.length) {
    throw new RangeError("the x and y vector doesn't have the same size.");
  }

  if (typeof from !== 'number' || isNaN(from)) {
    throw new RangeError("'from' option must be a number");
  }

  if (typeof to !== 'number' || isNaN(to)) {
    throw new RangeError("'to' option must be a number");
  }

  var reverse = from > to;

  if (reverse) {
    [from, to] = [to, from];
  }

  if (typeof numberOfPoints !== 'number' || isNaN(numberOfPoints)) {
    throw new RangeError("'numberOfPoints' option must be a number");
  }

  if (numberOfPoints < 1) {
    throw new RangeError('the number of points must be at least 1');
  }

  var output = variant === 'slot' ? getEquallySpacedSlot(x, y, from, to, numberOfPoints) : getEquallySpacedSmooth(x, y, from, to, numberOfPoints);
  return reverse ? output.reverse() : output;
}
/**
 * function that retrieves the getEquallySpacedData with the variant "smooth"
 *
 * @param x
 * @param y
 * @param from - Initial point
 * @param to - Final point
 * @param numberOfPoints
 * @returns {Array} - Array of y's equally spaced with the variant "smooth"
 */


function getEquallySpacedSmooth(x, y, from, to, numberOfPoints) {
  var xLength = x.length;
  var step = (to - from) / (numberOfPoints - 1);
  var halfStep = step / 2;
  var output = new Array(numberOfPoints);
  var initialOriginalStep = x[1] - x[0];
  var lastOriginalStep = x[xLength - 1] - x[xLength - 2]; // Init main variables

  var min = from - halfStep;
  var max = from + halfStep;
  var previousX = Number.MIN_VALUE;
  var previousY = 0;
  var nextX = x[0] - initialOriginalStep;
  var nextY = 0;
  var currentValue = 0;
  var slope = 0;
  var intercept = 0;
  var sumAtMin = 0;
  var sumAtMax = 0;
  var i = 0; // index of input

  var j = 0; // index of output

  function getSlope(x0, y0, x1, y1) {
    return (y1 - y0) / (x1 - x0);
  }

  main: while (true) {
    if (previousX <= min && min <= nextX) {
      add = integral(0, min - previousX, slope, previousY);
      sumAtMin = currentValue + add;
    }

    while (nextX - max >= 0) {
      // no overlap with original point, just consume current value
      var add = integral(0, max - previousX, slope, previousY);
      sumAtMax = currentValue + add;
      output[j++] = (sumAtMax - sumAtMin) / step;

      if (j === numberOfPoints) {
        break main;
      }

      min = max;
      max += step;
      sumAtMin = sumAtMax;
    }

    currentValue += integral(previousX, nextX, slope, intercept);
    previousX = nextX;
    previousY = nextY;

    if (i < xLength) {
      nextX = x[i];
      nextY = y[i];
      i++;
    } else if (i === xLength) {
      nextX += lastOriginalStep;
      nextY = 0;
    }

    slope = getSlope(previousX, previousY, nextX, nextY);
    intercept = -slope * previousX + previousY;
  }

  return output;
}
/**
 * function that retrieves the getEquallySpacedData with the variant "slot"
 *
 * @param x
 * @param y
 * @param from - Initial point
 * @param to - Final point
 * @param numberOfPoints
 * @returns {Array} - Array of y's equally spaced with the variant "slot"
 */


function getEquallySpacedSlot(x, y, from, to, numberOfPoints) {
  var xLength = x.length;
  var step = (to - from) / (numberOfPoints - 1);
  var halfStep = step / 2;
  var lastStep = x[x.length - 1] - x[x.length - 2];
  var start = from - halfStep;
  var output = new Array(numberOfPoints); // Init main variables

  var min = start;
  var max = start + step;
  var previousX = -Number.MAX_VALUE;
  var previousY = 0;
  var nextX = x[0];
  var nextY = y[0];
  var frontOutsideSpectra = 0;
  var backOutsideSpectra = true;
  var currentValue = 0; // for slot algorithm

  var currentPoints = 0;
  var i = 1; // index of input

  var j = 0; // index of output

  main: while (true) {
    if (previousX >= nextX) throw new Error('x must be an increasing serie');

    while (previousX - max > 0) {
      // no overlap with original point, just consume current value
      if (backOutsideSpectra) {
        currentPoints++;
        backOutsideSpectra = false;
      }

      output[j] = currentPoints <= 0 ? 0 : currentValue / currentPoints;
      j++;

      if (j === numberOfPoints) {
        break main;
      }

      min = max;
      max += step;
      currentValue = 0;
      currentPoints = 0;
    }

    if (previousX > min) {
      currentValue += previousY;
      currentPoints++;
    }

    if (previousX === -Number.MAX_VALUE || frontOutsideSpectra > 1) {
      currentPoints--;
    }

    previousX = nextX;
    previousY = nextY;

    if (i < xLength) {
      nextX = x[i];
      nextY = y[i];
      i++;
    } else {
      nextX += lastStep;
      nextY = 0;
      frontOutsideSpectra++;
    }
  }

  return output;
}
/**
 * Function that calculates the integral of the line between two
 * x-coordinates, given the slope and intercept of the line.
 * @param x0
 * @param x1
 * @param slope
 * @param intercept
 * @returns {number} integral value.
 */


function integral(x0, x1, slope, intercept) {
  return 0.5 * slope * x1 * x1 + intercept * x1 - (0.5 * slope * x0 * x0 + intercept * x0);
}

exports.getEquallySpacedData = getEquallySpacedData;
exports.integral = integral;

/***/ }),
/* 129 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


exports.SNV = SNV;

var Stat = __webpack_require__(3).array;
/**
 * Function that applies the standard normal variate (SNV) to an array of values.
 *
 * @param data - Array of values.
 * @returns {Array} - applied the SNV.
 */


function SNV(data) {
  var mean = Stat.mean(data);
  var std = Stat.standardDeviation(data);
  var result = data.slice();

  for (var i = 0; i < data.length; i++) {
    result[i] = (result[i] - mean) / std;
  }

  return result;
}

/***/ }),
/* 130 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var is_any_array__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(is_any_array__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Computes the mode of the given values
 * @param {Array<number>} input
 * @return {number}
 */

function mode(input) {
  if (!is_any_array__WEBPACK_IMPORTED_MODULE_0___default()(input)) {
    throw new TypeError('input must be an array');
  }

  if (input.length === 0) {
    throw new TypeError('input must not be empty');
  }

  var maxValue = 0;
  var maxCount = 0;
  var count = 0;
  var counts = {};

  for (var i = 0; i < input.length; ++i) {
    var element = input[i];
    count = counts[element];

    if (count) {
      counts[element]++;
      count++;
    } else {
      counts[element] = count = 1;
    }

    if (count > maxCount) {
      maxCount = count;
      maxValue = input[i];
    }
  }

  return maxValue;
}

/* harmony default export */ __webpack_exports__["default"] = (mode);

/***/ }),
/* 131 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/**
 * Computes the norm of the given values
 * @param {Array<number>} input
 * @param {object} [options={}]
 * @param {string} [algorithm='absolute']
 * @return {number}
 */
function norm(input) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _options$algorithm = options.algorithm,
      algorithm = _options$algorithm === void 0 ? 'absolute' : _options$algorithm;

  if (!Array.isArray(input)) {
    throw new Error('input must be an array');
  }

  if (input.length === 0) {
    throw new Error('input must not be empty');
  }

  switch (algorithm.toLowerCase()) {
    case 'absolute':
      var sum = absoluteSum(input);
      if (sum === 0) return input.slice(0);
      return input.map(function (element) {
        return element / sum;
      });

    default:
      throw new Error("norm: unknown algorithm: ".concat(algorithm));
  }
}

function absoluteSum(input) {
  var sum = 0;

  for (var i = 0; i < input.length; i++) {
    sum += Math.abs(input[i]);
  }

  return sum;
}

/* harmony default export */ __webpack_exports__["default"] = (norm);

/***/ }),
/* 132 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var ml_array_variance__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(21);

/**
 * Computes the standard deviation of the given values
 * @param {Array} values
 * @param {object} [options]
 * @param {boolean} [options.unbiased = true] - if true, divide by (n-1); if false, divide by n.
 * @param {number} [options.mean = arrayMean] - precalculated mean, if any.
 * @return {number}
 */

function standardDeviation(values) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return Math.sqrt(Object(ml_array_variance__WEBPACK_IMPORTED_MODULE_0__["default"])(values, options));
}

/* harmony default export */ __webpack_exports__["default"] = (standardDeviation);

/***/ }),
/* 133 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return mergeByCentroids; });
/**
 * Merge abscissa values if the ordinate value is in a list of centroids
 * @param {object} originalPoints
 * @param {Array<number>} originalPoints.x
 * @param {Array<number>} originalPoints.y
 * @param {Array<number>} centroids
 * @param {object} [options]
 * @param {number} [options.window = 0.01] - has to be a positive number
 * @return {{x: Array<number>, y: Array<number>}}
 */
function mergeByCentroids(originalPoints, centroids) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  const {
    window = 0.01
  } = options;
  var mergedPoints = {
    x: centroids.slice(),
    y: new Array(centroids.length).fill(0)
  };
  var originalIndex = 0;
  var mergedIndex = 0;

  while (originalIndex < originalPoints.x.length && mergedIndex < centroids.length) {
    var diff = originalPoints.x[originalIndex] - centroids[mergedIndex];

    if (Math.abs(diff) < window) {
      mergedPoints.y[mergedIndex] += originalPoints.y[originalIndex++];
    } else if (diff < 0) {
      originalIndex++;
    } else {
      mergedIndex++;
    }
  }

  return mergedPoints;
}

/***/ }),
/* 134 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return closestX; });
/* harmony import */ var binary_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var binary_search__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(binary_search__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var num_sort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var num_sort__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(num_sort__WEBPACK_IMPORTED_MODULE_1__);


/**
 *
 * @param {object} points
 * @param {Array<number>} originalPoints.x
 * @param {Array<number>} originalPoints.y
 * @param {*} options
 * @return {{x: Array<number>, y: Array<number>}}
 */

function closestX(points, options) {
  const {
    x,
    y
  } = points;
  const {
    target = x[0],
    reverse = false
  } = options;
  let index;

  if (reverse) {
    index = binary_search__WEBPACK_IMPORTED_MODULE_0___default()(x, target, num_sort__WEBPACK_IMPORTED_MODULE_1__["desc"]);
  } else {
    index = binary_search__WEBPACK_IMPORTED_MODULE_0___default()(x, target, num_sort__WEBPACK_IMPORTED_MODULE_1__["asc"]);
  }

  if (index >= 0) {
    return {
      x: x[index],
      y: y[index]
    };
  } else {
    index = ~index;

    if (index !== 0 && Math.abs(x[index] - target) > 0.5 || index === x.length) {
      return {
        x: x[index - 1],
        y: y[index - 1]
      };
    } else {
      return {
        x: x[index],
        y: y[index]
      };
    }
  }
}

/***/ }),
/* 135 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return maxMerge; });
/**
 * Merge abscissas values on similar ordinates and weight the group of abscissas
 * @param {object} points
 * @param {Array<number>} points.x - sorted abscissas values
 * @param {Array<number>} points.y - ordinates values
 * @param {object} [options]
 * @param {number} [options.groupWidth = 0.001] - window for abscissas to merge
 * @return {{x: Array<number>, y: Array<number>}}
 */
function maxMerge(points) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    x,
    y
  } = points;
  const {
    groupWidth = 0.001
  } = options;
  var merged = {
    x: [],
    y: []
  };
  var maxAbscissa = {
    x: [],
    y: []
  };
  var size = 0;
  var index = 0;

  while (index < x.length) {
    if (size === 0 || x[index] - merged.x[size - 1] > groupWidth) {
      maxAbscissa.x.push(x[index]);
      maxAbscissa.y.push(y[index]);
      merged.x.push(x[index]);
      merged.y.push(y[index]);
      index++;
      size++;
    } else {
      if (y[index] > maxAbscissa.y[size - 1]) {
        maxAbscissa.x[size - 1] = x[index];
        maxAbscissa.y[size - 1] = y[index];
      }

      merged.x[size - 1] = x[index];
      merged.y[size - 1] += y[index];
      index++;
    }
  }

  merged.x = maxAbscissa.x.slice();
  return merged;
}

/***/ }),
/* 136 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return maxY; });
/* harmony import */ var binary_search__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(6);
/* harmony import */ var binary_search__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(binary_search__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var num_sort__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(7);
/* harmony import */ var num_sort__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(num_sort__WEBPACK_IMPORTED_MODULE_1__);


/**
 * @param {object} points
 * @param {Array<number>} points.x - sorted abscissas values
 * @param {Array<number>} points.y - ordinates values
 * @param {object} [options]
 * @param {object} [options.from = {index: 0}]
 * @param {object} [options.to = {index: x.length-1}]
 * @param {boolean} [options.reverse = false]
 * @return {{index: number, value: number}}
 */

function maxY(points) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    x,
    y
  } = points;
  let {
    from = {
      index: 0
    },
    to = {
      index: x.length
    },
    reverse = false
  } = options;

  if (from.value !== undefined && from.index === undefined) {
    from.index = calculateIndex(from.value, x, reverse);
  }

  if (to.value !== undefined && to.index === undefined) {
    to.index = calculateIndex(to.value, x, reverse);
  }

  var currentMax = Number.MIN_VALUE;
  var currentIndex;

  for (var i = from.index; i < to.index; i++) {
    if (currentMax < y[i]) {
      currentMax = y[i];
      currentIndex = i;
    }
  }

  return {
    index: currentIndex,
    value: currentMax
  };
}
/**
 * @param {number} value
 * @param {Array<number>} x
 * @param {boolean} reverse
 * @return {number} index of the value in the array
 */

function calculateIndex(value, x, reverse) {
  let index;

  if (reverse) {
    index = binary_search__WEBPACK_IMPORTED_MODULE_0___default()(x, value, num_sort__WEBPACK_IMPORTED_MODULE_1__["desc"]);
  } else {
    index = binary_search__WEBPACK_IMPORTED_MODULE_0___default()(x, value, num_sort__WEBPACK_IMPORTED_MODULE_1__["asc"]);
  }

  if (index < 0) {
    throw new Error("the value ".concat(value, " doesn't belongs to the abscissa value"));
  }

  return index;
}

/***/ }),
/* 137 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return sortX; });
function sortX(points) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    x,
    y
  } = points;
  const {
    reverse = false
  } = options;
  var sortFunc;

  if (!reverse) {
    sortFunc = (a, b) => a.x - b.x;
  } else {
    sortFunc = (a, b) => b.x - a.x;
  }

  var grouped = x.map((val, index) => ({
    x: val,
    y: y[index]
  })).sort(sortFunc);
  var response = {
    x: x.slice(),
    y: y.slice()
  };

  for (var i = 0; i < x.length; i++) {
    response.x[i] = grouped[i].x;
    response.y[i] = grouped[i].y;
  }

  return response;
}

/***/ }),
/* 138 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return uniqueX; });
/**
 * In place modification of the 2 arrays to make X unique and sum the Y if X has the same value
 * @param {object} [points={}] : Object of points contains property x (an array) and y (an array)
 * @return points
 */
function uniqueX() {
  let points = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  const {
    x,
    y
  } = points;
  if (x.length < 2) return;

  if (x.length !== y.length) {
    throw new Error('The X and Y arrays mush have the same length');
  }

  let current = x[0];
  let counter = 0;

  for (let i = 1; i < x.length; i++) {
    if (current !== x[i]) {
      counter++;
      current = x[i];
      x[counter] = x[i];

      if (i !== counter) {
        y[counter] = 0;
      }
    }

    if (i !== counter) {
      y[counter] += y[i];
    }
  }

  x.length = counter + 1;
  y.length = counter + 1;
}

/***/ }),
/* 139 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return weightedMerge; });
/**
 * Merge abscissas values on similar ordinates and weight the group of abscissas
 * @param {object} points
 * @param {Array<number>} points.x - sorted abscissas values
 * @param {Array<number>} points.y - ordinates values
 * @param {object} [options]
 * @param {number} [options.groupWidth = 0.001] - window for abscissas to merge
 * @return {{x: Array<number>, y: Array<number>}}
 */
function weightedMerge(points) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    x,
    y
  } = points;
  const {
    groupWidth = 0.001
  } = options;
  var merged = {
    x: [],
    y: []
  };
  var weightedAbscissa = {
    x: [],
    y: []
  };
  var size = 0;
  var index = 0;

  while (index < x.length) {
    if (size === 0 || x[index] - merged.x[size - 1] > groupWidth) {
      weightedAbscissa.x.push(x[index] * y[index]);
      weightedAbscissa.y.push(y[index]);
      merged.x.push(x[index]);
      merged.y.push(y[index]);
      index++;
      size++;
    } else {
      weightedAbscissa.x[size - 1] += x[index] * y[index];
      weightedAbscissa.y[size - 1] += y[index];
      merged.x[size - 1] = x[index];
      merged.y[size - 1] += y[index];
      index++;
    }
  }

  for (var i = 0; i < merged.x.length; i++) {
    merged.x[i] = weightedAbscissa.x[i] / weightedAbscissa.y[i];
  }

  return merged;
}

/***/ }),
/* 140 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/ml-kmeans/node_modules/ml-distance-euclidean/lib-es6/euclidean.js
function squaredEuclidean(p, q) {
  let d = 0;

  for (let i = 0; i < p.length; i++) {
    d += (p[i] - q[i]) * (p[i] - q[i]);
  }

  return d;
}
function euclidean(p, q) {
  return Math.sqrt(squaredEuclidean(p, q));
}
// CONCATENATED MODULE: ./node_modules/ml-nearest-vector/node_modules/ml-distance-euclidean/lib-es6/euclidean.js
function euclidean_squaredEuclidean(p, q) {
  let d = 0;

  for (let i = 0; i < p.length; i++) {
    d += (p[i] - q[i]) * (p[i] - q[i]);
  }

  return d;
}
function euclidean_euclidean(p, q) {
  return Math.sqrt(euclidean_squaredEuclidean(p, q));
}
// CONCATENATED MODULE: ./node_modules/ml-nearest-vector/lib-es6/index.js



const defaultOptions = {
  distanceFunction: euclidean_squaredEuclidean
};
function nearestVector(listVectors, vector) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions;
  const distanceFunction = options.distanceFunction || defaultOptions.distanceFunction;
  const similarityFunction = options.similarityFunction || defaultOptions.similarityFunction;
  let vectorIndex = -1;

  if (typeof similarityFunction === 'function') {
    // maximum similarity
    let maxSim = Number.MIN_VALUE;

    for (let j = 0; j < listVectors.length; j++) {
      const sim = similarityFunction(vector, listVectors[j]);

      if (sim > maxSim) {
        maxSim = sim;
        vectorIndex = j;
      }
    }
  } else if (typeof distanceFunction === 'function') {
    // minimum distance
    let minDist = Number.MAX_VALUE;

    for (let i = 0; i < listVectors.length; i++) {
      const dist = distanceFunction(vector, listVectors[i]);

      if (dist < minDist) {
        minDist = dist;
        vectorIndex = i;
      }
    }
  } else {
    throw new Error("A similarity or distance function it's required");
  }

  return vectorIndex;
}
function findNearestVector(vectorList, vector) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : defaultOptions;
  const index = nearestVector(vectorList, vector, options);
  return vectorList[index];
}
// CONCATENATED MODULE: ./node_modules/ml-kmeans/src/utils.js

/**
 * Calculates the distance matrix for a given array of points
 * @ignore
 * @param {Array<Array<number>>} data - the [x,y,z,...] points to cluster
 * @param {function} distance - Distance function to use between the points
 * @return {Array<Array<number>>} - matrix with the distance values
 */

function calculateDistanceMatrix(data, distance) {
  var distanceMatrix = new Array(data.length);

  for (var i = 0; i < data.length; ++i) {
    for (var j = i; j < data.length; ++j) {
      if (!distanceMatrix[i]) {
        distanceMatrix[i] = new Array(data.length);
      }

      if (!distanceMatrix[j]) {
        distanceMatrix[j] = new Array(data.length);
      }

      const dist = distance(data[i], data[j]);
      distanceMatrix[i][j] = dist;
      distanceMatrix[j][i] = dist;
    }
  }

  return distanceMatrix;
}
/**
 * Updates the cluster identifier based in the new data
 * @ignore
 * @param {Array<Array<number>>} data - the [x,y,z,...] points to cluster
 * @param {Array<Array<number>>} centers - the K centers in format [x,y,z,...]
 * @param {Array <number>} clusterID - the cluster identifier for each data dot
 * @param {function} distance - Distance function to use between the points
 * @return {Array} the cluster identifier for each data dot
 */

function updateClusterID(data, centers, clusterID, distance) {
  for (var i = 0; i < data.length; i++) {
    clusterID[i] = nearestVector(centers, data[i], {
      distanceFunction: distance
    });
  }

  return clusterID;
}
/**
 * Update the center values based in the new configurations of the clusters
 * @ignore
 * @param {Array<Array<number>>} prevCenters - Centroids from the previous iteration
 * @param {Array <Array <number>>} data - the [x,y,z,...] points to cluster
 * @param {Array <number>} clusterID - the cluster identifier for each data dot
 * @param {number} K - Number of clusters
 * @return {Array} he K centers in format [x,y,z,...]
 */

function updateCenters(prevCenters, data, clusterID, K) {
  const nDim = data[0].length; // copy previous centers

  var centers = new Array(K);
  var centersLen = new Array(K);

  for (var i = 0; i < K; i++) {
    centers[i] = new Array(nDim);
    centersLen[i] = 0;

    for (var j = 0; j < nDim; j++) {
      centers[i][j] = 0;
    }
  } // add the value for all dimensions of the point


  for (var l = 0; l < data.length; l++) {
    centersLen[clusterID[l]]++;

    for (var dim = 0; dim < nDim; dim++) {
      centers[clusterID[l]][dim] += data[l][dim];
    }
  } // divides by length


  for (var id = 0; id < K; id++) {
    for (var d = 0; d < nDim; d++) {
      if (centersLen[id]) {
        centers[id][d] /= centersLen[id];
      } else {
        centers[id][d] = prevCenters[id][d];
      }
    }
  }

  return centers;
}
/**
 * The centers have moved more than the tolerance value?
 * @ignore
 * @param {Array<Array<number>>} centers - the K centers in format [x,y,z,...]
 * @param {Array<Array<number>>} oldCenters - the K old centers in format [x,y,z,...]
 * @param {function} distanceFunction - Distance function to use between the points
 * @param {number} tolerance - Allowed distance for the centroids to move
 * @return {boolean}
 */

function hasConverged(centers, oldCenters, distanceFunction, tolerance) {
  for (var i = 0; i < centers.length; i++) {
    if (distanceFunction(centers[i], oldCenters[i]) > tolerance) {
      return false;
    }
  }

  return true;
}
// EXTERNAL MODULE: ./node_modules/ml-random/lib-es6/index.js + 1 modules
var lib_es6 = __webpack_require__(11);

// EXTERNAL MODULE: ./node_modules/ml-matrix/src/index.js + 24 modules
var src = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/ml-kmeans/src/initialization.js



/**
 * Choose K different random points from the original data
 * @ignore
 * @param {Array<Array<number>>} data - Points in the format to cluster [x,y,z,...]
 * @param {number} K - number of clusters
 * @param {number} seed - seed for random number generation
 * @return {Array<Array<number>>} - Initial random points
 */

function initialization_random(data, K, seed) {
  const random = new lib_es6["default"](seed);
  return random.choice(data, {
    size: K
  });
}
/**
 * Chooses the most distant points to a first random pick
 * @ignore
 * @param {Array<Array<number>>} data - Points in the format to cluster [x,y,z,...]
 * @param {number} K - number of clusters
 * @param {Array<Array<number>>} distanceMatrix - matrix with the distance values
 * @param {number} seed - seed for random number generation
 * @return {Array<Array<number>>} - Initial random points
 */

function mostDistant(data, K, distanceMatrix, seed) {
  const random = new lib_es6["default"](seed);
  var ans = new Array(K); // chooses a random point as initial cluster

  ans[0] = Math.floor(random.random() * data.length);

  if (K > 1) {
    // chooses the more distant point
    var maxDist = {
      dist: -1,
      index: -1
    };

    for (var l = 0; l < data.length; ++l) {
      if (distanceMatrix[ans[0]][l] > maxDist.dist) {
        maxDist.dist = distanceMatrix[ans[0]][l];
        maxDist.index = l;
      }
    }

    ans[1] = maxDist.index;

    if (K > 2) {
      // chooses the set of points that maximises the min distance
      for (var k = 2; k < K; ++k) {
        var center = {
          dist: -1,
          index: -1
        };

        for (var m = 0; m < data.length; ++m) {
          // minimum distance to centers
          var minDistCent = {
            dist: Number.MAX_VALUE,
            index: -1
          };

          for (var n = 0; n < k; ++n) {
            if (distanceMatrix[n][m] < minDistCent.dist && ans.indexOf(m) === -1) {
              minDistCent = {
                dist: distanceMatrix[n][m],
                index: m
              };
            }
          }

          if (minDistCent.dist !== Number.MAX_VALUE && minDistCent.dist > center.dist) {
            center = Object.assign({}, minDistCent);
          }
        }

        ans[k] = center.index;
      }
    }
  }

  return ans.map(index => data[index]);
} // Implementation inspired from scikit

function kmeanspp(X, K) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  X = new src["Matrix"](X);
  const nSamples = X.length;
  const random = new lib_es6["default"](options.seed); // Set the number of trials

  const centers = [];
  const localTrials = options.localTrials || 2 + Math.floor(Math.log(K)); // Pick the first center at random from the dataset

  const firstCenterIdx = random.randInt(nSamples);
  centers.push(X[firstCenterIdx].slice()); // Init closest distances

  let closestDistSquared = [X.map(x => squaredEuclidean(x, centers[0]))];
  let cumSumClosestDistSquared = [cumSum(closestDistSquared[0])];
  const factor = 1 / cumSumClosestDistSquared[0][nSamples - 1];
  let probabilities = src["Matrix"].mul(closestDistSquared, factor); // Iterate over the remaining centers

  for (let i = 1; i < K; i++) {
    const candidateIdx = random.choice(nSamples, {
      replace: true,
      size: localTrials,
      probabilities: probabilities[0]
    });
    const candidates = X.selection(candidateIdx, range(X[0].length));
    const distanceToCandidates = euclidianDistances(candidates, X);
    let bestCandidate;
    let bestPot;
    let bestDistSquared;

    for (let j = 0; j < localTrials; j++) {
      const newDistSquared = src["Matrix"].min(closestDistSquared, [distanceToCandidates[j]]);
      const newPot = newDistSquared.sum();

      if (bestCandidate === undefined || newPot < bestPot) {
        bestCandidate = candidateIdx[j];
        bestPot = newPot;
        bestDistSquared = newDistSquared;
      }
    }

    centers[i] = X[bestCandidate].slice();
    closestDistSquared = bestDistSquared;
    cumSumClosestDistSquared = [cumSum(closestDistSquared[0])];
    probabilities = src["Matrix"].mul(closestDistSquared, 1 / cumSumClosestDistSquared[0][nSamples - 1]);
  }

  return centers;
}

function euclidianDistances(A, B) {
  const result = new src["Matrix"](A.length, B.length);

  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
      result.set(i, j, squaredEuclidean(A.getRow(i), B.getRow(j)));
    }
  }

  return result;
}

function range(l) {
  let r = [];

  for (let i = 0; i < l; i++) {
    r.push(i);
  }

  return r;
}

function cumSum(arr) {
  let cumSum = [arr[0]];

  for (let i = 1; i < arr.length; i++) {
    cumSum[i] = cumSum[i - 1] + arr[i];
  }

  return cumSum;
}
// CONCATENATED MODULE: ./node_modules/ml-kmeans/src/KMeansResult.js

const distanceSymbol = Symbol('distance');
class KMeansResult_KMeansResult {
  /**
   * Result of the kmeans algorithm
   * @param {Array<number>} clusters - the cluster identifier for each data dot
   * @param {Array<Array<object>>} centroids - the K centers in format [x,y,z,...], the error and size of the cluster
   * @param {boolean} converged - Converge criteria satisfied
   * @param {number} iterations - Current number of iterations
   * @param {function} distance - (*Private*) Distance function to use between the points
   * @constructor
   */
  constructor(clusters, centroids, converged, iterations, distance) {
    this.clusters = clusters;
    this.centroids = centroids;
    this.converged = converged;
    this.iterations = iterations;
    this[distanceSymbol] = distance;
  }
  /**
   * Allows to compute for a new array of points their cluster id
   * @param {Array<Array<number>>} data - the [x,y,z,...] points to cluster
   * @return {Array<number>} - cluster id for each point
   */


  nearest(data) {
    const clusterID = new Array(data.length);
    const centroids = this.centroids.map(function (centroid) {
      return centroid.centroid;
    });
    return updateClusterID(data, centroids, clusterID, this[distanceSymbol]);
  }
  /**
   * Returns a KMeansResult with the error and size of the cluster
   * @ignore
   * @param {Array<Array<number>>} data - the [x,y,z,...] points to cluster
   * @return {KMeansResult}
   */


  computeInformation(data) {
    var enrichedCentroids = this.centroids.map(function (centroid) {
      return {
        centroid: centroid,
        error: 0,
        size: 0
      };
    });

    for (var i = 0; i < data.length; i++) {
      enrichedCentroids[this.clusters[i]].error += this[distanceSymbol](data[i], this.centroids[this.clusters[i]]);
      enrichedCentroids[this.clusters[i]].size++;
    }

    for (var j = 0; j < this.centroids.length; j++) {
      if (enrichedCentroids[j].size) {
        enrichedCentroids[j].error /= enrichedCentroids[j].size;
      } else {
        enrichedCentroids[j].error = null;
      }
    }

    return new KMeansResult_KMeansResult(this.clusters, enrichedCentroids, this.converged, this.iterations, this[distanceSymbol]);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-kmeans/src/kmeans.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return kmeans; });




const kmeans_defaultOptions = {
  maxIterations: 100,
  tolerance: 1e-6,
  withIterations: false,
  initialization: 'kmeans++',
  distanceFunction: squaredEuclidean
};
/**
 * Each step operation for kmeans
 * @ignore
 * @param {Array<Array<number>>} centers - K centers in format [x,y,z,...]
 * @param {Array<Array<number>>} data - Points [x,y,z,...] to cluster
 * @param {Array<number>} clusterID - Cluster identifier for each data dot
 * @param {number} K - Number of clusters
 * @param {object} [options] - Option object
 * @param {number} iterations - Current number of iterations
 * @return {KMeansResult}
 */

function step(centers, data, clusterID, K, options, iterations) {
  clusterID = updateClusterID(data, centers, clusterID, options.distanceFunction);
  var newCenters = updateCenters(centers, data, clusterID, K);
  var converged = hasConverged(newCenters, centers, options.distanceFunction, options.tolerance);
  return new KMeansResult_KMeansResult(clusterID, newCenters, converged, iterations, options.distanceFunction);
}
/**
 * Generator version for the algorithm
 * @ignore
 * @param {Array<Array<number>>} centers - K centers in format [x,y,z,...]
 * @param {Array<Array<number>>} data - Points [x,y,z,...] to cluster
 * @param {Array<number>} clusterID - Cluster identifier for each data dot
 * @param {number} K - Number of clusters
 * @param {object} [options] - Option object
 */


function* kmeansGenerator(centers, data, clusterID, K, options) {
  var converged = false;
  var stepNumber = 0;
  var stepResult;

  while (!converged && stepNumber < options.maxIterations) {
    stepResult = step(centers, data, clusterID, K, options, ++stepNumber);
    yield stepResult.computeInformation(data);
    converged = stepResult.converged;
    centers = stepResult.centroids;
  }
}
/**
 * K-means algorithm
 * @param {Array<Array<number>>} data - Points in the format to cluster [x,y,z,...]
 * @param {number} K - Number of clusters
 * @param {object} [options] - Option object
 * @param {number} [options.maxIterations = 100] - Maximum of iterations allowed
 * @param {number} [options.tolerance = 1e-6] - Error tolerance
 * @param {boolean} [options.withIterations = false] - Store clusters and centroids for each iteration
 * @param {function} [options.distanceFunction = squaredDistance] - Distance function to use between the points
 * @param {number} [options.seed] - Seed for random initialization.
 * @param {string|Array<Array<number>>} [options.initialization = 'kmeans++'] - K centers in format [x,y,z,...] or a method for initialize the data:
 *  * You can either specify your custom start centroids, or select one of the following initialization method:
 *  * `'kmeans++'` will use the kmeans++ method as described by http://ilpubs.stanford.edu:8090/778/1/2006-13.pdf
 *  * `'random'` will choose K random different values.
 *  * `'mostDistant'` will choose the more distant points to a first random pick
 * @return {KMeansResult} - Cluster identifier for each data dot and centroids with the following fields:
 *  * `'clusters'`: Array of indexes for the clusters.
 *  * `'centroids'`: Array with the resulting centroids.
 *  * `'iterations'`: Number of iterations that took to converge
 */


function kmeans(data, K, options) {
  options = Object.assign({}, kmeans_defaultOptions, options);

  if (K <= 0 || K > data.length || !Number.isInteger(K)) {
    throw new Error('K should be a positive integer smaller than the number of points');
  }

  var centers;

  if (Array.isArray(options.initialization)) {
    if (options.initialization.length !== K) {
      throw new Error('The initial centers should have the same length as K');
    } else {
      centers = options.initialization;
    }
  } else {
    switch (options.initialization) {
      case 'kmeans++':
        centers = kmeanspp(data, K, options);
        break;

      case 'random':
        centers = initialization_random(data, K, options.seed);
        break;

      case 'mostDistant':
        centers = mostDistant(data, K, calculateDistanceMatrix(data, options.distanceFunction), options.seed);
        break;

      default:
        throw new Error("Unknown initialization method: \"".concat(options.initialization, "\""));
    }
  } // infinite loop until convergence


  if (options.maxIterations === 0) {
    options.maxIterations = Number.MAX_VALUE;
  }

  var clusterID = new Array(data.length);

  if (options.withIterations) {
    return kmeansGenerator(centers, data, clusterID, K, options);
  } else {
    var converged = false;
    var stepNumber = 0;
    var stepResult;

    while (!converged && stepNumber < options.maxIterations) {
      stepResult = step(centers, data, clusterID, K, options, ++stepNumber);
      converged = stepResult.converged;
      centers = stepResult.centroids;
    }

    return stepResult.computeInformation(data);
  }
}

/***/ }),
/* 141 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/ml-cart/src/index.js + 4 modules
var src = __webpack_require__(8);

// EXTERNAL MODULE: ./node_modules/ml-matrix/src/index.js + 24 modules
var ml_matrix_src = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/random-js/lib/random.js
var random = __webpack_require__(12);
var random_default = /*#__PURE__*/__webpack_require__.n(random);

// CONCATENATED MODULE: ./node_modules/ml-random-forest/src/utils.js


function checkFloat(n) {
  return n > 0.0 && n <= 1.0;
}
/**
 * Select n with replacement elements on the training set and values, where n is the size of the training set.
 * @ignore
 * @param {Matrix} trainingSet
 * @param {Array} trainingValue
 * @param {number} seed - seed for the random selection, must be a 32-bit integer.
 * @return {object} with new X and y.
 */

function examplesBaggingWithReplacement(trainingSet, trainingValue, seed) {
  var engine = random_default.a.engines.mt19937();
  var distribution = random_default.a.integer(0, trainingSet.rows - 1);

  if (seed === undefined) {
    engine = engine.autoSeed();
  } else if (Number.isInteger(seed)) {
    engine = engine.seed(seed);
  } else {
    throw new RangeError("Expected seed must be undefined or integer not ".concat(seed));
  }

  var Xr = new Array(trainingSet.rows);
  var yr = new Array(trainingSet.rows);

  for (var i = 0; i < trainingSet.rows; ++i) {
    var index = distribution(engine);
    Xr[i] = trainingSet[index];
    yr[i] = trainingValue[index];
  }

  return {
    X: new ml_matrix_src["default"](Xr),
    y: yr
  };
}
/**
 * selects n features from the training set with or without replacement, returns the new training set and the indexes used.
 * @ignore
 * @param {Matrix} trainingSet
 * @param {number} n - features.
 * @param {boolean} replacement
 * @param {number} seed - seed for the random selection, must be a 32-bit integer.
 * @return {object}
 */

function featureBagging(trainingSet, n, replacement, seed) {
  if (trainingSet.columns < n) {
    throw new RangeError('N should be less or equal to the number of columns of X');
  }

  var distribution = random_default.a.integer(0, trainingSet.columns - 1);
  var engine = random_default.a.engines.mt19937();

  if (seed === undefined) {
    engine = engine.autoSeed();
  } else if (Number.isInteger(seed)) {
    engine = engine.seed(seed);
  } else {
    throw new RangeError("Expected seed must be undefined or integer not ".concat(seed));
  }

  var toRet = new ml_matrix_src["default"](trainingSet.rows, n);

  if (replacement) {
    var usedIndex = new Array(n);

    for (var i = 0; i < n; ++i) {
      var index = distribution(engine);
      usedIndex[i] = index;
      toRet.setColumn(i, trainingSet.getColumn(index));
    }
  } else {
    usedIndex = new Set();
    index = distribution(engine);

    for (i = 0; i < n; ++i) {
      while (usedIndex.has(index)) {
        index = distribution(engine);
      }

      toRet.setColumn(i, trainingSet.getColumn(index));
      usedIndex.add(index);
    }

    usedIndex = Array.from(usedIndex);
  }

  return {
    X: toRet,
    usedIndex: usedIndex
  };
}
// CONCATENATED MODULE: ./node_modules/ml-random-forest/src/RandomForestBase.js



/**
 * @class RandomForestBase
 */

class RandomForestBase_RandomForestBase {
  /**
   * Create a new base random forest for a classifier or regression model.
   * @constructor
   * @param {object} options
   * @param {number|String} [options.maxFeatures] - the number of features used on each estimator.
   *        * if is an integer it selects maxFeatures elements over the sample features.
   *        * if is a float between (0, 1), it takes the percentage of features.
   * @param {boolean} [options.replacement] - use replacement over the sample features.
   * @param {number} [options.seed] - seed for feature and samples selection, must be a 32-bit integer.
   * @param {number} [options.nEstimators] - number of estimator to use.
   * @param {object} [options.treeOptions] - options for the tree classifier, see [ml-cart]{@link https://mljs.github.io/decision-tree-cart/}
   * @param {boolean} [options.isClassifier] - boolean to check if is a classifier or regression model (used by subclasses).
   * @param {boolean} [options.useSampleBagging] - use bagging over training samples.
   * @param {object} model - for load purposes.
   */
  constructor(options, model) {
    if (options === true) {
      this.replacement = model.replacement;
      this.maxFeatures = model.maxFeatures;
      this.nEstimators = model.nEstimators;
      this.treeOptions = model.treeOptions;
      this.isClassifier = model.isClassifier;
      this.seed = model.seed;
      this.n = model.n;
      this.indexes = model.indexes;
      this.useSampleBagging = model.useSampleBagging;
      var Estimator = this.isClassifier ? src["DecisionTreeClassifier"] : src["DecisionTreeRegression"];
      this.estimators = model.estimators.map(est => Estimator.load(est));
    } else {
      this.replacement = options.replacement;
      this.maxFeatures = options.maxFeatures;
      this.nEstimators = options.nEstimators;
      this.treeOptions = options.treeOptions;
      this.isClassifier = options.isClassifier;
      this.seed = options.seed;
      this.useSampleBagging = options.useSampleBagging;
    }
  }
  /**
   * Train the decision tree with the given training set and labels.
   * @param {Matrix|Array} trainingSet
   * @param {Array} trainingValues
   */


  train(trainingSet, trainingValues) {
    trainingSet = ml_matrix_src["Matrix"].checkMatrix(trainingSet);
    this.maxFeatures = this.maxFeatures || trainingSet.columns;

    if (checkFloat(this.maxFeatures)) {
      this.n = Math.floor(trainingSet.columns * this.maxFeatures);
    } else if (Number.isInteger(this.maxFeatures)) {
      if (this.maxFeatures > trainingSet.columns) {
        throw new RangeError("The maxFeatures parameter should be less than ".concat(trainingSet.columns));
      } else {
        this.n = this.maxFeatures;
      }
    } else {
      throw new RangeError("Cannot process the maxFeatures parameter ".concat(this.maxFeatures));
    }

    if (this.isClassifier) {
      var Estimator = src["DecisionTreeClassifier"];
    } else {
      Estimator = src["DecisionTreeRegression"];
    }

    this.estimators = new Array(this.nEstimators);
    this.indexes = new Array(this.nEstimators);

    for (var i = 0; i < this.nEstimators; ++i) {
      var res = this.useSampleBagging ? examplesBaggingWithReplacement(trainingSet, trainingValues, this.seed) : {
        X: trainingSet,
        y: trainingValues
      };
      var X = res.X;
      var y = res.y;
      res = featureBagging(X, this.n, this.replacement, this.seed);
      X = res.X;
      this.indexes[i] = res.usedIndex;
      this.estimators[i] = new Estimator(this.treeOptions);
      this.estimators[i].train(X, y);
    }
  }
  /**
   * Method that returns the way the algorithm generates the predictions, for example, in classification
   * you can return the mode of all predictions retrieved by the trees, or in case of regression you can
   * use the mean or the median.
   * @abstract
   * @param {Array} values - predictions of the estimators.
   * @return {number} prediction.
   */
  // eslint-disable-next-line no-unused-vars


  selection(values) {
    throw new Error('Abstract method \'selection\' not implemented!');
  }
  /**
   * Predicts the output given the matrix to predict.
   * @param {Matrix|Array} toPredict
   * @return {Array} predictions
   */


  predict(toPredict) {
    var predictionValues = new Array(this.nEstimators);
    toPredict = ml_matrix_src["Matrix"].checkMatrix(toPredict);

    for (var i = 0; i < this.nEstimators; ++i) {
      var X = toPredict.columnSelectionView(this.indexes[i]); // get features for estimator

      predictionValues[i] = this.estimators[i].predict(X);
    }

    predictionValues = new ml_matrix_src["WrapperMatrix2D"](predictionValues).transposeView();
    var predictions = new Array(predictionValues.rows);

    for (i = 0; i < predictionValues.rows; ++i) {
      predictions[i] = this.selection(predictionValues.getRow(i));
    }

    return predictions;
  }
  /**
   * Export the current model to JSON.
   * @return {object} - Current model.
   */


  toJSON() {
    return {
      indexes: this.indexes,
      n: this.n,
      replacement: this.replacement,
      maxFeatures: this.maxFeatures,
      nEstimators: this.nEstimators,
      treeOptions: this.treeOptions,
      isClassifier: this.isClassifier,
      seed: this.seed,
      estimators: this.estimators.map(est => est.toJSON()),
      useSampleBagging: this.useSampleBagging
    };
  }

}
// CONCATENATED MODULE: ./node_modules/ml-random-forest/src/RandomForestClassifier.js

const defaultOptions = {
  maxFeatures: 1.0,
  replacement: true,
  nEstimators: 10,
  seed: 42,
  useSampleBagging: false
};
/**
 * @class RandomForestClassifier
 * @augments RandomForestBase
 */

class RandomForestClassifier_RandomForestClassifier extends RandomForestBase_RandomForestBase {
  /**
     * Create a new base random forest for a classifier or regression model.
     * @constructor
     * @param {object} options
     * @param {number} [options.maxFeatures=1.0] - the number of features used on each estimator.
     *        * if is an integer it selects maxFeatures elements over the sample features.
     *        * if is a float between (0, 1), it takes the percentage of features.
     * @param {boolean} [options.replacement=true] - use replacement over the sample features.
     * @param {number} [options.seed=42] - seed for feature and samples selection, must be a 32-bit integer.
     * @param {number} [options.nEstimators=10] - number of estimator to use.
     * @param {object} [options.treeOptions={}] - options for the tree classifier, see [ml-cart]{@link https://mljs.github.io/decision-tree-cart/}
     * @param {boolean} [options.useSampleBagging=false] - use bagging over training samples.
     * @param {object} model - for load purposes.
     */
  constructor(options, model) {
    if (options === true) {
      super(true, model.baseModel);
    } else {
      options = Object.assign({}, defaultOptions, options);
      options.isClassifier = true;
      super(options);
    }
  }
  /**
     * retrieve the prediction given the selection method.
     * @param {Array} values - predictions of the estimators.
     * @return {number} prediction
     */


  selection(values) {
    return mode(values);
  }
  /**
     * Export the current model to JSON.
     * @return {object} - Current model.
     */


  toJSON() {
    var baseModel = super.toJSON();
    return {
      baseModel: baseModel,
      name: 'RFClassifier'
    };
  }
  /**
     * Load a Decision tree classifier with the given model.
     * @param {object} model
     * @return {RandomForestClassifier}
     */


  static load(model) {
    if (model.name !== 'RFClassifier') {
      throw new RangeError("Invalid model: ".concat(model.name));
    }

    return new RandomForestClassifier_RandomForestClassifier(true, model);
  }

}
/**
 * Return the most repeated element on the array.
 * @param {Array} arr
 * @return {number} mode
 */

function mode(arr) {
  return arr.sort((a, b) => arr.filter(v => v === a).length - arr.filter(v => v === b).length).pop();
}
// EXTERNAL MODULE: ./node_modules/ml-array-mean/lib-es6/index.js
var lib_es6 = __webpack_require__(5);

// EXTERNAL MODULE: ./node_modules/ml-array-median/lib-es6/index.js
var ml_array_median_lib_es6 = __webpack_require__(18);

// CONCATENATED MODULE: ./node_modules/ml-random-forest/src/RandomForestRegression.js



const selectionMethods = {
  mean: lib_es6["default"],
  median: ml_array_median_lib_es6["default"]
};
const RandomForestRegression_defaultOptions = {
  maxFeatures: 1.0,
  replacement: false,
  nEstimators: 10,
  treeOptions: {},
  selectionMethod: 'mean',
  seed: 42,
  useSampleBagging: false
};
/**
 * @class RandomForestRegression
 * @augments RandomForestBase
 */

class RandomForestRegression_RandomForestRegression extends RandomForestBase_RandomForestBase {
  /**
     * Create a new base random forest for a classifier or regression model.
     * @constructor
     * @param {object} options
     * @param {number} [options.maxFeatures=1.0] - the number of features used on each estimator.
     *        * if is an integer it selects maxFeatures elements over the sample features.
     *        * if is a float between (0, 1), it takes the percentage of features.
     * @param {boolean} [options.replacement=true] - use replacement over the sample features.
     * @param {number} [options.seed=42] - seed for feature and samples selection, must be a 32-bit integer.
     * @param {number} [options.nEstimators=10] - number of estimator to use.
     * @param {object} [options.treeOptions={}] - options for the tree classifier, see [ml-cart]{@link https://mljs.github.io/decision-tree-cart/}
     * @param {string} [options.selectionMethod="mean"] - the way to calculate the prediction from estimators, "mean" and "median" are supported.
     * @param {boolean} [options.useSampleBagging=false] - use bagging over training samples.
     * @param {object} model - for load purposes.
     */
  constructor(options, model) {
    if (options === true) {
      super(true, model.baseModel);
      this.selectionMethod = model.selectionMethod;
    } else {
      options = Object.assign({}, RandomForestRegression_defaultOptions, options);

      if (!(options.selectionMethod === 'mean' || options.selectionMethod === 'median')) {
        throw new RangeError("Unsupported selection method ".concat(options.selectionMethod));
      }

      options.isClassifier = false;
      super(options);
      this.selectionMethod = options.selectionMethod;
    }
  }
  /**
     * retrieve the prediction given the selection method.
     * @param {Array} values - predictions of the estimators.
     * @return {number} prediction
     */


  selection(values) {
    return selectionMethods[this.selectionMethod](values);
  }
  /**
     * Export the current model to JSON.
     * @return {object} - Current model.
     */


  toJSON() {
    var baseModel = super.toJSON();
    return {
      baseModel: baseModel,
      selectionMethod: this.selectionMethod,
      name: 'RFRegression'
    };
  }
  /**
     * Load a Decision tree classifier with the given model.
     * @param {object} model
     * @return {RandomForestRegression}
     */


  static load(model) {
    if (model.name !== 'RFRegression') {
      throw new RangeError("Invalid model: ".concat(model.name));
    }

    return new RandomForestRegression_RandomForestRegression(true, model);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-random-forest/src/index.js
/* concated harmony reexport RandomForestClassifier */__webpack_require__.d(__webpack_exports__, "RandomForestClassifier", function() { return RandomForestClassifier_RandomForestClassifier; });
/* concated harmony reexport RandomForestRegression */__webpack_require__.d(__webpack_exports__, "RandomForestRegression", function() { return RandomForestRegression_RandomForestRegression; });



/***/ }),
/* 142 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/ml-array-sequential-fill/lib-es6/index.js
var lib_es6 = __webpack_require__(20);

// CONCATENATED MODULE: ./node_modules/ml-array-xy-equally-spaced/src/integral.js
/**
 * Function that calculates the integral of the line between two
 * x-coordinates, given the slope and intercept of the line.
 * @param {number} x0
 * @param {number} x1
 * @param {number} slope
 * @param {number} intercept
 * @return {number} integral value.
 */
function integral(x0, x1, slope, intercept) {
  return 0.5 * slope * x1 * x1 + intercept * x1 - (0.5 * slope * x0 * x0 + intercept * x0);
}
// CONCATENATED MODULE: ./node_modules/ml-array-xy-equally-spaced/src/equallySpacedSmooth.js

/**
 * function that retrieves the getEquallySpacedData with the variant "smooth"
 *
 * @param {Array<number>} x
 * @param {Array<number>} y
 * @param {number} from - Initial point
 * @param {number} to - Final point
 * @param {number} numberOfPoints
 * @return {Array} - Array of y's equally spaced with the variant "smooth"
 */

function equallySpacedSmooth(x, y, from, to, numberOfPoints) {
  var xLength = x.length;
  var step = (to - from) / (numberOfPoints - 1);
  var halfStep = step / 2;
  var output = new Array(numberOfPoints);
  var initialOriginalStep = x[1] - x[0];
  var lastOriginalStep = x[xLength - 1] - x[xLength - 2]; // Init main variables

  var min = from - halfStep;
  var max = from + halfStep;
  var previousX = Number.MIN_VALUE;
  var previousY = 0;
  var nextX = x[0] - initialOriginalStep;
  var nextY = 0;
  var currentValue = 0;
  var slope = 0;
  var intercept = 0;
  var sumAtMin = 0;
  var sumAtMax = 0;
  var i = 0; // index of input

  var j = 0; // index of output

  function getSlope(x0, y0, x1, y1) {
    return (y1 - y0) / (x1 - x0);
  }

  main: while (true) {
    if (previousX <= min && min <= nextX) {
      add = integral(0, min - previousX, slope, previousY);
      sumAtMin = currentValue + add;
    }

    while (nextX - max >= 0) {
      // no overlap with original point, just consume current value
      var add = integral(0, max - previousX, slope, previousY);
      sumAtMax = currentValue + add;
      output[j++] = (sumAtMax - sumAtMin) / step;

      if (j === numberOfPoints) {
        break main;
      }

      min = max;
      max += step;
      sumAtMin = sumAtMax;
    }

    currentValue += integral(previousX, nextX, slope, intercept);
    previousX = nextX;
    previousY = nextY;

    if (i < xLength) {
      nextX = x[i];
      nextY = y[i];
      i++;
    } else if (i === xLength) {
      nextX += lastOriginalStep;
      nextY = 0;
    }

    slope = getSlope(previousX, previousY, nextX, nextY);
    intercept = -slope * previousX + previousY;
  }

  return output;
}
// CONCATENATED MODULE: ./node_modules/ml-array-xy-equally-spaced/src/equallySpacedSlot.js
/**
 * function that retrieves the getEquallySpacedData with the variant "slot"
 *
 * @param {Array<number>} x
 * @param {Array<number>} y
 * @param {number} from - Initial point
 * @param {number} to - Final point
 * @param {number} numberOfPoints
 * @return {Array} - Array of y's equally spaced with the variant "slot"
 */
function equallySpacedSlot(x, y, from, to, numberOfPoints) {
  var xLength = x.length;
  var step = (to - from) / (numberOfPoints - 1);
  var halfStep = step / 2;
  var lastStep = x[x.length - 1] - x[x.length - 2];
  var start = from - halfStep;
  var output = new Array(numberOfPoints); // Init main variables

  var min = start;
  var max = start + step;
  var previousX = -Number.MAX_VALUE;
  var previousY = 0;
  var nextX = x[0];
  var nextY = y[0];
  var frontOutsideSpectra = 0;
  var backOutsideSpectra = true;
  var currentValue = 0; // for slot algorithm

  var currentPoints = 0;
  var i = 1; // index of input

  var j = 0; // index of output

  main: while (true) {
    if (previousX >= nextX) throw new Error('x must be an increasing serie');

    while (previousX - max > 0) {
      // no overlap with original point, just consume current value
      if (backOutsideSpectra) {
        currentPoints++;
        backOutsideSpectra = false;
      }

      output[j] = currentPoints <= 0 ? 0 : currentValue / currentPoints;
      j++;

      if (j === numberOfPoints) {
        break main;
      }

      min = max;
      max += step;
      currentValue = 0;
      currentPoints = 0;
    }

    if (previousX > min) {
      currentValue += previousY;
      currentPoints++;
    }

    if (previousX === -Number.MAX_VALUE || frontOutsideSpectra > 1) {
      currentPoints--;
    }

    previousX = nextX;
    previousY = nextY;

    if (i < xLength) {
      nextX = x[i];
      nextY = y[i];
      i++;
    } else {
      nextX += lastStep;
      nextY = 0;
      frontOutsideSpectra++;
    }
  }

  return output;
}
// CONCATENATED MODULE: ./node_modules/ml-array-xy-equally-spaced/src/getZones.js
function getZones(from, to, numberOfPoints) {
  let exclusions = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  if (from > to) {
    [from, to] = [to, from];
  } // in exclusions from and to have to be defined


  exclusions = exclusions.filter(exclusion => exclusion.from !== undefined && exclusion.to !== undefined);
  exclusions = JSON.parse(JSON.stringify(exclusions)); // we ensure that from before to

  exclusions.forEach(exclusion => {
    if (exclusion.from > exclusion.to) {
      [exclusion.to, exclusion.from] = [exclusion.from, exclusion.to];
    }
  });
  exclusions.sort((a, b) => a.from - b.from); // we will rework the exclusions in order to remove overlap and outside range (from / to)

  exclusions.forEach(exclusion => {
    if (exclusion.from < from) exclusion.from = from;
    if (exclusion.to > to) exclusion.to = to;
  });

  for (let i = 0; i < exclusions.length - 1; i++) {
    if (exclusions[i].to > exclusions[i + 1].from) {
      exclusions[i].to = exclusions[i + 1].from;
    }
  }

  exclusions = exclusions.filter(exclusion => exclusion.from < exclusion.to);

  if (!exclusions || exclusions.length === 0) {
    return [{
      from,
      to,
      numberOfPoints
    }];
  } // need to deal with overlapping exclusions and out of bound exclusions


  let toRemove = exclusions.reduce((previous, exclusion) => previous += exclusion.to - exclusion.from, 0);
  let total = to - from;
  let unitsPerPoint = (total - toRemove) / numberOfPoints;
  let zones = [];
  let currentFrom = from;
  let totalPoints = 0;

  for (let exclusion of exclusions) {
    let currentNbPoints = Math.round((exclusion.from - currentFrom) / unitsPerPoint);
    totalPoints += currentNbPoints;

    if (currentNbPoints > 0) {
      zones.push({
        from: currentFrom,
        to: exclusion.from,
        numberOfPoints: currentNbPoints
      });
    }

    currentFrom = exclusion.to;
  }

  if (numberOfPoints - totalPoints > 0) {
    zones.push({
      from: currentFrom,
      to: to,
      numberOfPoints: numberOfPoints - totalPoints
    });
  }

  return zones;
}
// CONCATENATED MODULE: ./node_modules/ml-array-xy-equally-spaced/src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return equallySpaced; });




/**
 * Function that returns a Number array of equally spaced numberOfPoints
 * containing a representation of intensities of the spectra arguments x
 * and y.
 *
 * The options parameter contains an object in the following form:
 * from: starting point
 * to: last point
 * numberOfPoints: number of points between from and to
 * variant: "slot" or "smooth" - smooth is the default option
 *
 * The slot variant consist that each point in the new array is calculated
 * averaging the existing points between the slot that belongs to the current
 * value. The smooth variant is the same but takes the integral of the range
 * of the slot and divide by the step size between two points in the new array.
 *
 * @param {object} [arrayXY={}] - object containing 2 properties x and y (both an array)
 * @param {object} [options={}]
 * @param {number} [options.from=x[0]]
 * @param {number} [options.to=x[x.length-1]]
 * @param {string} [options.variant='smooth']
 * @param {number} [options.numberOfPoints=100]
 * @param {Array} [options.exclusions=[]] array of from / to that should be skipped for the generation of the points
 * @return {object<x: Array, y:Array>} new object with x / y array with the equally spaced data.
 */

function equallySpaced() {
  let arrayXY = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  let {
    x,
    y
  } = arrayXY;
  let xLength = x.length;
  let reverse = false;

  if (x.length > 1 && x[0] > x[1]) {
    x = x.slice().reverse();
    y = y.slice().reverse();
    reverse = true;
  }

  let {
    from = x[0],
    to = x[xLength - 1],
    variant = 'smooth',
    numberOfPoints = 100,
    exclusions = []
  } = options;

  if (xLength !== y.length) {
    throw new RangeError("the x and y vector doesn't have the same size.");
  }

  if (typeof from !== 'number' || isNaN(from)) {
    throw new RangeError("'from' option must be a number");
  }

  if (typeof to !== 'number' || isNaN(to)) {
    throw new RangeError("'to' option must be a number");
  }

  if (typeof numberOfPoints !== 'number' || isNaN(numberOfPoints)) {
    throw new RangeError("'numberOfPoints' option must be a number");
  }

  let zones = getZones(from, to, numberOfPoints, exclusions);
  let xResult = [];
  let yResult = [];

  for (let zone of zones) {
    let zoneResult = processZone(x, y, zone.from, zone.to, zone.numberOfPoints, variant, reverse);
    xResult.push(...zoneResult.x);
    yResult.push(...zoneResult.y);
  }

  if (reverse) {
    if (from < to) {
      return {
        x: xResult.reverse(),
        y: yResult.reverse()
      };
    } else {
      return {
        x: xResult,
        y: yResult
      };
    }
  } else {
    if (from < to) {
      return {
        x: xResult,
        y: yResult
      };
    } else {
      return {
        x: xResult.reverse(),
        y: yResult.reverse()
      };
    }
  }
}

function processZone(x, y, from, to, numberOfPoints, variant) {
  if (numberOfPoints < 1) {
    throw new RangeError('the number of points must be at least 1');
  }

  var output = variant === 'slot' ? equallySpacedSlot(x, y, from, to, numberOfPoints) : equallySpacedSmooth(x, y, from, to, numberOfPoints);
  return {
    x: Object(lib_es6["default"])({
      from,
      to,
      size: numberOfPoints
    }),
    y: output
  };
}

/***/ }),
/* 143 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/ml-matrix/src/index.js + 24 modules
var src = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ml-stat/index.js
var ml_stat = __webpack_require__(3);
var ml_stat_default = /*#__PURE__*/__webpack_require__.n(ml_stat);

// CONCATENATED MODULE: ./node_modules/ml-naivebayes/src/utils.js

/**
 * @private
 * Function that retuns an array of matrices of the cases that belong to each class.
 * @param {Matrix} X - dataset
 * @param {Array} y - predictions
 * @return {Array}
 */

function separateClasses(X, y) {
  var features = X.columns;
  var classes = 0;
  var totalPerClasses = new Array(10000); // max upperbound of classes

  for (var i = 0; i < y.length; i++) {
    if (totalPerClasses[y[i]] === undefined) {
      totalPerClasses[y[i]] = 0;
      classes++;
    }

    totalPerClasses[y[i]]++;
  }

  var separatedClasses = new Array(classes);
  var currentIndex = new Array(classes);

  for (i = 0; i < classes; ++i) {
    separatedClasses[i] = new src["default"](totalPerClasses[i], features);
    currentIndex[i] = 0;
  }

  for (i = 0; i < X.rows; ++i) {
    separatedClasses[y[i]].setRow(currentIndex[y[i]], X.getRow(i));
    currentIndex[y[i]]++;
  }

  return separatedClasses;
}
// CONCATENATED MODULE: ./node_modules/ml-naivebayes/src/GaussianNB.js



/**
 * @class GaussianNB
 */

class GaussianNB_GaussianNB {
  /**
   * @constructor
   * Constructor for the Gaussian Naive Bayes classifier, the parameters here is just for loading purposes.
   *
   * @param {boolean} reload
   * @param {object} model
   */
  constructor(reload, model) {
    if (reload) {
      this.means = model.means;
      this.calculateProbabilities = model.calculateProbabilities;
    }
  }
  /**
   * Function that trains the classifier with a matrix that represents the training set and an array that
   * represents the label of each row in the training set. the labels must be numbers between 0 to n-1 where
   * n represents the number of classes.
   *
   * WARNING: in the case that one class, all the cases in one or more features have the same value, the
   * Naive Bayes classifier will not work well.
   * @param {Matrix|Array} trainingSet
   * @param {Matrix|Array} trainingLabels
   */


  train(trainingSet, trainingLabels) {
    var C1 = Math.sqrt(2 * Math.PI); // constant to precalculate the squared root

    trainingSet = src["default"].checkMatrix(trainingSet); //if (!Matrix.isMatrix(trainingSet)) trainingSet = new Matrix(trainingSet);

    if (trainingSet.rows !== trainingLabels.length) {
      throw new RangeError('the size of the training set and the training labels must be the same.');
    }

    var separatedClasses = separateClasses(trainingSet, trainingLabels);
    var calculateProbabilities = new Array(separatedClasses.length);
    this.means = new Array(separatedClasses.length);

    for (var i = 0; i < separatedClasses.length; ++i) {
      var means = ml_stat_default.a.matrix.mean(separatedClasses[i]);
      var std = ml_stat_default.a.matrix.standardDeviation(separatedClasses[i], means);
      var logPriorProbability = Math.log(separatedClasses[i].rows / trainingSet.rows);
      calculateProbabilities[i] = new Array(means.length + 1);
      calculateProbabilities[i][0] = logPriorProbability;

      for (var j = 1; j < means.length + 1; ++j) {
        var currentStd = std[j - 1];
        calculateProbabilities[i][j] = [1 / (C1 * currentStd), -2 * currentStd * currentStd];
      }

      this.means[i] = means;
    }

    this.calculateProbabilities = calculateProbabilities;
  }
  /**
   * function that predicts each row of the dataset (must be a matrix).
   *
   * @param {Matrix|Array} dataset
   * @return {Array}
   */


  predict(dataset) {
    if (dataset[0].length === this.calculateProbabilities[0].length) {
      throw new RangeError('the dataset must have the same features as the training set');
    }

    var predictions = new Array(dataset.length);

    for (var i = 0; i < predictions.length; ++i) {
      predictions[i] = getCurrentClass(dataset[i], this.means, this.calculateProbabilities);
    }

    return predictions;
  }
  /**
   * Function that export the NaiveBayes model.
   * @return {object}
   */


  toJSON() {
    return {
      modelName: 'NaiveBayes',
      means: this.means,
      calculateProbabilities: this.calculateProbabilities
    };
  }
  /**
   * Function that create a GaussianNB classifier with the given model.
   * @param {object} model
   * @return {GaussianNB}
   */


  static load(model) {
    if (model.modelName !== 'NaiveBayes') {
      throw new RangeError('The current model is not a Multinomial Naive Bayes, current model:', model.name);
    }

    return new GaussianNB_GaussianNB(true, model);
  }

}
/**
 * @private
 * Function the retrieves a prediction with one case.
 *
 * @param {Array} currentCase
 * @param {Array} mean - Precalculated means of each class trained
 * @param {Array} classes - Precalculated value of each class (Prior probability and probability function of each feature)
 * @return {number}
 */

function getCurrentClass(currentCase, mean, classes) {
  var maxProbability = 0;
  var predictedClass = -1; // going through all precalculated values for the classes

  for (var i = 0; i < classes.length; ++i) {
    var currentProbability = classes[i][0]; // initialize with the prior probability

    for (var j = 1; j < classes[0][1].length + 1; ++j) {
      currentProbability += calculateLogProbability(currentCase[j - 1], mean[i][j - 1], classes[i][j][0], classes[i][j][1]);
    }

    currentProbability = Math.exp(currentProbability);

    if (currentProbability > maxProbability) {
      maxProbability = currentProbability;
      predictedClass = i;
    }
  }

  return predictedClass;
}
/**
 * @private
 * function that retrieves the probability of the feature given the class.
 * @param {number} value - value of the feature.
 * @param {number} mean - mean of the feature for the given class.
 * @param {number} C1 - precalculated value of (1 / (sqrt(2*pi) * std)).
 * @param {number} C2 - precalculated value of (2 * std^2) for the denominator of the exponential.
 * @return {number}
 */


function calculateLogProbability(value, mean, C1, C2) {
  value = value - mean;
  return Math.log(C1 * Math.exp(value * value / C2));
}
// CONCATENATED MODULE: ./node_modules/ml-naivebayes/src/MultinomialNB.js


/**
 * @class MultinomialNB
 */

class MultinomialNB_MultinomialNB {
  /**
   * @constructor
   * Constructor for Multinomial Naive Bayes, the model parameter is for load purposes.
   *
   * @param {object} model - for load purposes.
   */
  constructor(model) {
    if (model) {
      this.conditionalProbability = src["default"].checkMatrix(model.conditionalProbability);
      this.priorProbability = src["default"].checkMatrix(model.priorProbability);
    }
  }
  /**
   * Train the classifier with the current training set and labels, the labels must be numbers between 0 and n.
   * @param {Matrix|Array} trainingSet
   * @param {Array} trainingLabels
   */


  train(trainingSet, trainingLabels) {
    trainingSet = src["default"].checkMatrix(trainingSet);

    if (trainingSet.rows !== trainingLabels.length) {
      throw new RangeError('the size of the training set and the training labels must be the same.');
    }

    var separateClass = separateClasses(trainingSet, trainingLabels);
    this.priorProbability = new src["default"](separateClass.length, 1);

    for (var i = 0; i < separateClass.length; ++i) {
      this.priorProbability[i][0] = Math.log(separateClass[i].length / trainingSet.rows);
    }

    var features = trainingSet.columns;
    this.conditionalProbability = new src["default"](separateClass.length, features);

    for (i = 0; i < separateClass.length; ++i) {
      var classValues = src["default"].checkMatrix(separateClass[i]);
      var total = classValues.sum();
      var divisor = total + features;
      this.conditionalProbability.setRow(i, classValues.sum('column').add(1).div(divisor).apply(matrixLog));
    }
  }
  /**
   * Retrieves the predictions for the dataset with the current model.
   * @param {Matrix|Array} dataset
   * @return {Array} - predictions from the dataset.
   */


  predict(dataset) {
    dataset = src["default"].checkMatrix(dataset);
    var predictions = new Array(dataset.rows);

    for (var i = 0; i < dataset.rows; ++i) {
      var currentElement = dataset.getRowVector(i);
      predictions[i] = this.conditionalProbability.clone().mulRowVector(currentElement).sum('row').add(this.priorProbability).maxIndex()[0];
    }

    return predictions;
  }
  /**
   * Function that saves the current model.
   * @return {object} - model in JSON format.
   */


  toJSON() {
    return {
      name: 'MultinomialNB',
      priorProbability: this.priorProbability,
      conditionalProbability: this.conditionalProbability
    };
  }
  /**
   * Creates a new MultinomialNB from the given model
   * @param {object} model
   * @return {MultinomialNB}
   */


  static load(model) {
    if (model.name !== 'MultinomialNB') {
      throw new RangeError("".concat(model.name, " is not a Multinomial Naive Bayes"));
    }

    return new MultinomialNB_MultinomialNB(model);
  }

}

function matrixLog(i, j) {
  this[i][j] = Math.log(this[i][j]);
}
// CONCATENATED MODULE: ./node_modules/ml-naivebayes/src/index.js
/* concated harmony reexport GaussianNB */__webpack_require__.d(__webpack_exports__, "GaussianNB", function() { return GaussianNB_GaussianNB; });
/* concated harmony reexport MultinomialNB */__webpack_require__.d(__webpack_exports__, "MultinomialNB", function() { return MultinomialNB_MultinomialNB; });



/***/ }),
/* 144 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// EXTERNAL MODULE: ./node_modules/ml-matrix/src/index.js + 24 modules
var src = __webpack_require__(0);

// EXTERNAL MODULE: ./node_modules/ml-stat/matrix.js
var matrix = __webpack_require__(4);
var matrix_default = /*#__PURE__*/__webpack_require__.n(matrix);

// CONCATENATED MODULE: ./node_modules/ml-pls/src/utils.js


/**
 * @private
 * Function that given vector, returns his norm
 * @param {Vector} X
 * @return {number} Norm of the vector
 */

function norm(X) {
  return Math.sqrt(X.clone().apply(pow2array).sum());
}
/**
 * @private
 * Function that pow 2 each element of a Matrix or a Vector,
 * used in the apply method of the Matrix object
 * @param {number} i - index i.
 * @param {number} j - index j.
 * @return {Matrix} The Matrix object modified at the index i, j.
 * */

function pow2array(i, j) {
  this[i][j] = this[i][j] * this[i][j];
  return this;
}
/**
 * @private
 * Function that normalize the dataset and return the means and
 * standard deviation of each feature.
 * @param {Matrix} dataset
 * @return {object} dataset normalized, means and standard deviations
 */

function featureNormalize(dataset) {
  var means = matrix_default.a.mean(dataset);
  var std = matrix_default.a.standardDeviation(dataset, means, true);
  var result = src["default"].checkMatrix(dataset).subRowVector(means);
  return {
    result: result.divRowVector(std),
    means: means,
    std: std
  };
}
/**
 * @private
 * Function that initialize an array of matrices.
 * @param {Array} array
 * @param {boolean} isMatrix
 * @return {Array} array with the matrices initialized.
 */

function initializeMatrices(array, isMatrix) {
  if (isMatrix) {
    for (var i = 0; i < array.length; ++i) {
      for (var j = 0; j < array[i].length; ++j) {
        var elem = array[i][j];
        array[i][j] = elem !== null ? new src["default"](array[i][j]) : undefined;
      }
    }
  } else {
    for (i = 0; i < array.length; ++i) {
      array[i] = new src["default"](array[i]);
    }
  }

  return array;
}
// CONCATENATED MODULE: ./node_modules/ml-pls/src/pls.js



/**
 * @class PLS
 */

class pls_PLS {
  /**
   * Constructor for Partial Least Squares (PLS)
   * @param {object} options
   * @param {number} [options.latentVectors] - Number of latent vector to get (if the algorithm doesn't find a good model below the tolerance)
   * @param {number} [options.tolerance=1e-5]
   * @param {boolean} [options.scale=true] - rescale dataset using mean.
   * @param {object} model - for load purposes.
   */
  constructor(options, model) {
    if (options === true) {
      this.meanX = model.meanX;
      this.stdDevX = model.stdDevX;
      this.meanY = model.meanY;
      this.stdDevY = model.stdDevY;
      this.PBQ = src["default"].checkMatrix(model.PBQ);
      this.R2X = model.R2X;
      this.scale = model.scale;
      this.scaleMethod = model.scaleMethod;
      this.tolerance = model.tolerance;
    } else {
      var {
        tolerance = 1e-5,
        scale = true
      } = options;
      this.tolerance = tolerance;
      this.scale = scale;
      this.latentVectors = options.latentVectors;
    }
  }
  /**
   * Fits the model with the given data and predictions, in this function is calculated the
   * following outputs:
   *
   * T - Score matrix of X
   * P - Loading matrix of X
   * U - Score matrix of Y
   * Q - Loading matrix of Y
   * B - Matrix of regression coefficient
   * W - Weight matrix of X
   *
   * @param {Matrix|Array} trainingSet
   * @param {Matrix|Array} trainingValues
   */


  train(trainingSet, trainingValues) {
    trainingSet = src["default"].checkMatrix(trainingSet);
    trainingValues = src["default"].checkMatrix(trainingValues);

    if (trainingSet.length !== trainingValues.length) {
      throw new RangeError('The number of X rows must be equal to the number of Y rows');
    }

    this.meanX = matrix_default.a.mean(trainingSet);
    this.stdDevX = matrix_default.a.standardDeviation(trainingSet, this.meanX, true);
    this.meanY = matrix_default.a.mean(trainingValues);
    this.stdDevY = matrix_default.a.standardDeviation(trainingValues, this.meanY, true);

    if (this.scale) {
      // here should be the ml-preprocess project
      trainingSet = trainingSet.clone().subRowVector(this.meanX).divRowVector(this.stdDevX);
      trainingValues = trainingValues.clone().subRowVector(this.meanY).divRowVector(this.stdDevY);
    }

    if (this.latentVectors === undefined) {
      this.latentVectors = Math.min(trainingSet.length - 1, trainingSet[0].length);
    }

    var rx = trainingSet.rows;
    var cx = trainingSet.columns;
    var ry = trainingValues.rows;
    var cy = trainingValues.columns;
    var ssqXcal = trainingSet.clone().mul(trainingSet).sum(); // for the r²

    var sumOfSquaresY = trainingValues.clone().mul(trainingValues).sum();
    var tolerance = this.tolerance;
    var n = this.latentVectors;
    var T = src["default"].zeros(rx, n);
    var P = src["default"].zeros(cx, n);
    var U = src["default"].zeros(ry, n);
    var Q = src["default"].zeros(cy, n);
    var B = src["default"].zeros(n, n);
    var W = P.clone();
    var k = 0;

    while (norm(trainingValues) > tolerance && k < n) {
      var transposeX = trainingSet.transpose();
      var transposeY = trainingValues.transpose();
      var tIndex = maxSumColIndex(trainingSet.clone().mulM(trainingSet));
      var uIndex = maxSumColIndex(trainingValues.clone().mulM(trainingValues));
      var t1 = trainingSet.getColumnVector(tIndex);
      var u = trainingValues.getColumnVector(uIndex);
      var t = src["default"].zeros(rx, 1);

      while (norm(t1.clone().sub(t)) > tolerance) {
        var w = transposeX.mmul(u);
        w.div(norm(w));
        t = t1;
        t1 = trainingSet.mmul(w);
        var q = transposeY.mmul(t1);
        q.div(norm(q));
        u = trainingValues.mmul(q);
      }

      t = t1;
      var num = transposeX.mmul(t);
      var den = t.transpose().mmul(t)[0][0];
      var p = num.div(den);
      var pnorm = norm(p);
      p.div(pnorm);
      t.mul(pnorm);
      w.mul(pnorm);
      num = u.transpose().mmul(t);
      den = t.transpose().mmul(t)[0][0];
      var b = num.div(den)[0][0];
      trainingSet.sub(t.mmul(p.transpose()));
      trainingValues.sub(t.clone().mul(b).mmul(q.transpose()));
      T.setColumn(k, t);
      P.setColumn(k, p);
      U.setColumn(k, u);
      Q.setColumn(k, q);
      W.setColumn(k, w);
      B[k][k] = b;
      k++;
    }

    k--;
    T = T.subMatrix(0, T.rows - 1, 0, k);
    P = P.subMatrix(0, P.rows - 1, 0, k);
    U = U.subMatrix(0, U.rows - 1, 0, k);
    Q = Q.subMatrix(0, Q.rows - 1, 0, k);
    W = W.subMatrix(0, W.rows - 1, 0, k);
    B = B.subMatrix(0, k, 0, k); // TODO: review of R2Y
    //this.R2Y = t.transpose().mmul(t).mul(q[k][0]*q[k][0]).divS(ssqYcal)[0][0];
    //

    this.ssqYcal = sumOfSquaresY;
    this.E = trainingSet;
    this.F = trainingValues;
    this.T = T;
    this.P = P;
    this.U = U;
    this.Q = Q;
    this.W = W;
    this.B = B;
    this.PBQ = P.mmul(B).mmul(Q.transpose());
    this.R2X = t.transpose().mmul(t).mmul(p.transpose().mmul(p)).div(ssqXcal)[0][0];
  }
  /**
   * Predicts the behavior of the given dataset.
   * @param {Matrix|Array} dataset - data to be predicted.
   * @return {Matrix} - predictions of each element of the dataset.
   */


  predict(dataset) {
    var X = src["default"].checkMatrix(dataset);

    if (this.scale) {
      X = X.subRowVector(this.meanX).divRowVector(this.stdDevX);
    }

    var Y = X.mmul(this.PBQ);
    Y = Y.mulRowVector(this.stdDevY).addRowVector(this.meanY);
    return Y;
  }
  /**
   * Returns the explained variance on training of the PLS model
   * @return {number}
   */


  getExplainedVariance() {
    return this.R2X;
  }
  /**
   * Export the current model to JSON.
   * @return {object} - Current model.
   */


  toJSON() {
    return {
      name: 'PLS',
      R2X: this.R2X,
      meanX: this.meanX,
      stdDevX: this.stdDevX,
      meanY: this.meanY,
      stdDevY: this.stdDevY,
      PBQ: this.PBQ,
      tolerance: this.tolerance,
      scale: this.scale
    };
  }
  /**
   * Load a PLS model from a JSON Object
   * @param {object} model
   * @return {PLS} - PLS object from the given model
   */


  static load(model) {
    if (model.name !== 'PLS') {
      throw new RangeError('Invalid model: ' + model.name);
    }

    return new pls_PLS(true, model);
  }

}
/**
 * @private
 * Function that returns the index where the sum of each
 * column vector is maximum.
 * @param {Matrix} data
 * @return {number} index of the maximum
 */

function maxSumColIndex(data) {
  return data.sum('column').maxIndex()[0];
}
// CONCATENATED MODULE: ./node_modules/ml-pls/src/kopls.js


/**
 * @class KOPLS
 */

class kopls_KOPLS {
  /**
   * Constructor for Kernel-based Orthogonal Projections to Latent Structures (K-OPLS)
   * @param {object} options
   * @param {number} [options.predictiveComponents] - Number of predictive components to use.
   * @param {number} [options.orthogonalComponents] - Number of Y-Orthogonal components.
   * @param {Kernel} [options.kernel] - Kernel object to apply, see [ml-kernel](https://github.com/mljs/kernel).
   * @param {object} model - for load purposes.
   */
  constructor(options, model) {
    if (options === true) {
      this.trainingSet = new src["Matrix"](model.trainingSet);
      this.YLoadingMat = new src["Matrix"](model.YLoadingMat);
      this.SigmaPow = new src["Matrix"](model.SigmaPow);
      this.YScoreMat = new src["Matrix"](model.YScoreMat);
      this.predScoreMat = initializeMatrices(model.predScoreMat, false);
      this.YOrthLoadingVec = initializeMatrices(model.YOrthLoadingVec, false);
      this.YOrthEigen = model.YOrthEigen;
      this.YOrthScoreMat = initializeMatrices(model.YOrthScoreMat, false);
      this.toNorm = initializeMatrices(model.toNorm, false);
      this.TURegressionCoeff = initializeMatrices(model.TURegressionCoeff, false);
      this.kernelX = initializeMatrices(model.kernelX, true);
      this.kernel = model.kernel;
      this.orthogonalComp = model.orthogonalComp;
      this.predictiveComp = model.predictiveComp;
    } else {
      if (options.predictiveComponents === undefined) {
        throw new RangeError('no predictive components found!');
      }

      if (options.orthogonalComponents === undefined) {
        throw new RangeError('no orthogonal components found!');
      }

      if (options.kernel === undefined) {
        throw new RangeError('no kernel found!');
      }

      this.orthogonalComp = options.orthogonalComponents;
      this.predictiveComp = options.predictiveComponents;
      this.kernel = options.kernel;
    }
  }
  /**
   * Train the K-OPLS model with the given training set and labels.
   * @param {Matrix|Array} trainingSet
   * @param {Matrix|Array} trainingValues
   */


  train(trainingSet, trainingValues) {
    trainingSet = src["Matrix"].checkMatrix(trainingSet);
    trainingValues = src["Matrix"].checkMatrix(trainingValues); // to save and compute kernel with the prediction dataset.

    this.trainingSet = trainingSet.clone();
    var kernelX = this.kernel.compute(trainingSet);
    var Identity = src["Matrix"].eye(kernelX.rows, kernelX.rows, 1);
    var temp = kernelX;
    kernelX = new src["Matrix"](this.orthogonalComp + 1, this.orthogonalComp + 1);
    kernelX[0][0] = temp;
    var result = new src["SingularValueDecomposition"](trainingValues.transpose().mmul(kernelX[0][0]).mmul(trainingValues), {
      computeLeftSingularVectors: true,
      computeRightSingularVectors: false
    });
    var YLoadingMat = result.leftSingularVectors;
    var Sigma = result.diagonalMatrix;
    YLoadingMat = YLoadingMat.subMatrix(0, YLoadingMat.rows - 1, 0, this.predictiveComp - 1);
    Sigma = Sigma.subMatrix(0, this.predictiveComp - 1, 0, this.predictiveComp - 1);
    var YScoreMat = trainingValues.mmul(YLoadingMat);
    var predScoreMat = new Array(this.orthogonalComp + 1);
    var TURegressionCoeff = new Array(this.orthogonalComp + 1);
    var YOrthScoreMat = new Array(this.orthogonalComp);
    var YOrthLoadingVec = new Array(this.orthogonalComp);
    var YOrthEigen = new Array(this.orthogonalComp);
    var YOrthScoreNorm = new Array(this.orthogonalComp);
    var SigmaPow = src["Matrix"].pow(Sigma, -0.5); // to avoid errors, check infinity

    SigmaPow.apply(function (i, j) {
      if (this[i][j] === Infinity) {
        this[i][j] = 0.0;
      }
    });

    for (var i = 0; i < this.orthogonalComp; ++i) {
      predScoreMat[i] = kernelX[0][i].transpose().mmul(YScoreMat).mmul(SigmaPow);
      var TpiPrime = predScoreMat[i].transpose();
      TURegressionCoeff[i] = Object(src["inverse"])(TpiPrime.mmul(predScoreMat[i])).mmul(TpiPrime).mmul(YScoreMat);
      result = new src["SingularValueDecomposition"](TpiPrime.mmul(src["Matrix"].sub(kernelX[i][i], predScoreMat[i].mmul(TpiPrime))).mmul(predScoreMat[i]), {
        computeLeftSingularVectors: true,
        computeRightSingularVectors: false
      });
      var CoTemp = result.leftSingularVectors;
      var SoTemp = result.diagonalMatrix;
      YOrthLoadingVec[i] = CoTemp.subMatrix(0, CoTemp.rows - 1, 0, 0);
      YOrthEigen[i] = SoTemp[0][0];
      YOrthScoreMat[i] = src["Matrix"].sub(kernelX[i][i], predScoreMat[i].mmul(TpiPrime)).mmul(predScoreMat[i]).mmul(YOrthLoadingVec[i]).mul(Math.pow(YOrthEigen[i], -0.5));
      var toiPrime = YOrthScoreMat[i].transpose();
      YOrthScoreNorm[i] = src["Matrix"].sqrt(toiPrime.mmul(YOrthScoreMat[i]));
      YOrthScoreMat[i] = YOrthScoreMat[i].divRowVector(YOrthScoreNorm[i]);
      var ITo = src["Matrix"].sub(Identity, YOrthScoreMat[i].mmul(YOrthScoreMat[i].transpose()));
      kernelX[0][i + 1] = kernelX[0][i].mmul(ITo);
      kernelX[i + 1][i + 1] = ITo.mmul(kernelX[i][i]).mmul(ITo);
    }

    var lastScoreMat = predScoreMat[this.orthogonalComp] = kernelX[0][this.orthogonalComp].transpose().mmul(YScoreMat).mmul(SigmaPow);
    var lastTpPrime = lastScoreMat.transpose();
    TURegressionCoeff[this.orthogonalComp] = Object(src["inverse"])(lastTpPrime.mmul(lastScoreMat)).mmul(lastTpPrime).mmul(YScoreMat);
    this.YLoadingMat = YLoadingMat;
    this.SigmaPow = SigmaPow;
    this.YScoreMat = YScoreMat;
    this.predScoreMat = predScoreMat;
    this.YOrthLoadingVec = YOrthLoadingVec;
    this.YOrthEigen = YOrthEigen;
    this.YOrthScoreMat = YOrthScoreMat;
    this.toNorm = YOrthScoreNorm;
    this.TURegressionCoeff = TURegressionCoeff;
    this.kernelX = kernelX;
  }
  /**
   * Predicts the output given the matrix to predict.
   * @param {Matrix|Array} toPredict
   * @return {{y: Matrix, predScoreMat: Array<Matrix>, predYOrthVectors: Array<Matrix>}} predictions
   */


  predict(toPredict) {
    var KTestTrain = this.kernel.compute(toPredict, this.trainingSet);
    var temp = KTestTrain;
    KTestTrain = new src["Matrix"](this.orthogonalComp + 1, this.orthogonalComp + 1);
    KTestTrain[0][0] = temp;
    var YOrthScoreVector = new Array(this.orthogonalComp);
    var predScoreMat = new Array(this.orthogonalComp);
    var i;

    for (i = 0; i < this.orthogonalComp; ++i) {
      predScoreMat[i] = KTestTrain[i][0].mmul(this.YScoreMat).mmul(this.SigmaPow);
      YOrthScoreVector[i] = src["Matrix"].sub(KTestTrain[i][i], predScoreMat[i].mmul(this.predScoreMat[i].transpose())).mmul(this.predScoreMat[i]).mmul(this.YOrthLoadingVec[i]).mul(Math.pow(this.YOrthEigen[i], -0.5));
      YOrthScoreVector[i] = YOrthScoreVector[i].divRowVector(this.toNorm[i]);
      var scoreMatPrime = this.YOrthScoreMat[i].transpose();
      KTestTrain[i + 1][0] = src["Matrix"].sub(KTestTrain[i][0], YOrthScoreVector[i].mmul(scoreMatPrime).mmul(this.kernelX[0][i].transpose()));
      var p1 = src["Matrix"].sub(KTestTrain[i][0], KTestTrain[i][i].mmul(this.YOrthScoreMat[i]).mmul(scoreMatPrime));
      var p2 = YOrthScoreVector[i].mmul(scoreMatPrime).mmul(this.kernelX[i][i]);
      var p3 = p2.mmul(this.YOrthScoreMat[i]).mmul(scoreMatPrime);
      KTestTrain[i + 1][i + 1] = p1.sub(p2).add(p3);
    }

    predScoreMat[i] = KTestTrain[i][0].mmul(this.YScoreMat).mmul(this.SigmaPow);
    var prediction = predScoreMat[i].mmul(this.TURegressionCoeff[i]).mmul(this.YLoadingMat.transpose());
    return {
      prediction: prediction,
      predScoreMat: predScoreMat,
      predYOrthVectors: YOrthScoreVector
    };
  }
  /**
   * Export the current model to JSON.
   * @return {object} - Current model.
   */


  toJSON() {
    return {
      name: 'K-OPLS',
      YLoadingMat: this.YLoadingMat,
      SigmaPow: this.SigmaPow,
      YScoreMat: this.YScoreMat,
      predScoreMat: this.predScoreMat,
      YOrthLoadingVec: this.YOrthLoadingVec,
      YOrthEigen: this.YOrthEigen,
      YOrthScoreMat: this.YOrthScoreMat,
      toNorm: this.toNorm,
      TURegressionCoeff: this.TURegressionCoeff,
      kernelX: this.kernelX,
      trainingSet: this.trainingSet,
      orthogonalComp: this.orthogonalComp,
      predictiveComp: this.predictiveComp
    };
  }
  /**
   * Load a K-OPLS with the given model.
   * @param {object} model
   * @param {Kernel} kernel - kernel used on the model, see [ml-kernel](https://github.com/mljs/kernel).
   * @return {KOPLS}
   */


  static load(model, kernel) {
    if (model.name !== 'K-OPLS') {
      throw new RangeError('Invalid model: ' + model.name);
    }

    if (!kernel) {
      throw new RangeError('You must provide a kernel for the model!');
    }

    model.kernel = kernel;
    return new kopls_KOPLS(true, model);
  }

}
// CONCATENATED MODULE: ./node_modules/ml-pls/src/index.js
/* concated harmony reexport PLS */__webpack_require__.d(__webpack_exports__, "PLS", function() { return pls_PLS; });
/* concated harmony reexport KOPLS */__webpack_require__.d(__webpack_exports__, "KOPLS", function() { return kopls_KOPLS; });



/***/ }),
/* 145 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/ml-levenberg-marquardt/src/errorCalculation.js
/**
 * Calculate current error
 * @ignore
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @param {Array<number>} parameters - Array of current parameter values
 * @param {function} parameterizedFunction - The parameters and returns a function with the independent variable as a parameter
 * @return {number}
 */
function errorCalculation(data, parameters, parameterizedFunction) {
  var error = 0;
  const func = parameterizedFunction(parameters);

  for (var i = 0; i < data.x.length; i++) {
    error += Math.abs(data.y[i] - func(data.x[i]));
  }

  return error;
}
// EXTERNAL MODULE: ./node_modules/ml-matrix/src/index.js + 24 modules
var src = __webpack_require__(0);

// CONCATENATED MODULE: ./node_modules/ml-levenberg-marquardt/src/step.js

/**
 * Difference of the matrix function over the parameters
 * @ignore
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @param {Array<number>} evaluatedData - Array of previous evaluated function values
 * @param {Array<number>} params - Array of previous parameter values
 * @param {number} gradientDifference - Adjustment for decrease the damping parameter
 * @param {function} paramFunction - The parameters and returns a function with the independent variable as a parameter
 * @return {Matrix}
 */

function gradientFunction(data, evaluatedData, params, gradientDifference, paramFunction) {
  const n = params.length;
  const m = data.x.length;
  var ans = new Array(n);

  for (var param = 0; param < n; param++) {
    ans[param] = new Array(m);
    var auxParams = params.concat();
    auxParams[param] += gradientDifference;
    var funcParam = paramFunction(auxParams);

    for (var point = 0; point < m; point++) {
      ans[param][point] = evaluatedData[point] - funcParam(data.x[point]);
    }
  }

  return new src["Matrix"](ans);
}
/**
 * Matrix function over the samples
 * @ignore
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @param {Array<number>} evaluatedData - Array of previous evaluated function values
 * @return {Matrix}
 */


function matrixFunction(data, evaluatedData) {
  const m = data.x.length;
  var ans = new Array(m);

  for (var point = 0; point < m; point++) {
    ans[point] = [data.y[point] - evaluatedData[point]];
  }

  return new src["Matrix"](ans);
}
/**
 * Iteration for Levenberg-Marquardt
 * @ignore
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @param {Array<number>} params - Array of previous parameter values
 * @param {number} damping - Levenberg-Marquardt parameter
 * @param {number} gradientDifference - Adjustment for decrease the damping parameter
 * @param {function} parameterizedFunction - The parameters and returns a function with the independent variable as a parameter
 * @return {Array<number>}
 */


function step(data, params, damping, gradientDifference, parameterizedFunction) {
  var value = damping * gradientDifference * gradientDifference;
  var identity = src["Matrix"].eye(params.length, params.length, value);
  const func = parameterizedFunction(params);
  var evaluatedData = data.x.map(e => func(e));
  var gradientFunc = gradientFunction(data, evaluatedData, params, gradientDifference, parameterizedFunction);
  var matrixFunc = matrixFunction(data, evaluatedData);
  var inverseMatrix = Object(src["inverse"])(identity.add(gradientFunc.mmul(gradientFunc.transpose())));
  params = new src["Matrix"]([params]);
  params = params.sub(inverseMatrix.mmul(gradientFunc).mmul(matrixFunc).mul(gradientDifference).transpose());
  return params.to1DArray();
}
// CONCATENATED MODULE: ./node_modules/ml-levenberg-marquardt/src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return levenbergMarquardt; });


/**
 * Curve fitting algorithm
 * @param {{x:Array<number>, y:Array<number>}} data - Array of points to fit in the format [x1, x2, ... ], [y1, y2, ... ]
 * @param {function} parameterizedFunction - The parameters and returns a function with the independent variable as a parameter
 * @param {object} [options] - Options object
 * @param {number} [options.damping] - Levenberg-Marquardt parameter
 * @param {number} [options.gradientDifference = 10e-2] - Adjustment for decrease the damping parameter
 * @param {Array<number>} [options.minValues] - Minimum allowed values for parameters
 * @param {Array<number>} [options.maxValues] - Maximum allowed values for parameters
 * @param {Array<number>} [options.initialValues] - Array of initial parameter values
 * @param {number} [options.maxIterations = 100] - Maximum of allowed iterations
 * @param {number} [options.errorTolerance = 10e-3] - Minimum uncertainty allowed for each point
 * @return {{parameterValues: Array<number>, parameterError: number, iterations: number}}
 */

function levenbergMarquardt(data, parameterizedFunction) {
  let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  let {
    maxIterations = 100,
    gradientDifference = 10e-2,
    damping = 0,
    errorTolerance = 10e-3,
    minValues,
    maxValues,
    initialValues
  } = options;

  if (damping <= 0) {
    throw new Error('The damping option must be a positive number');
  } else if (!data.x || !data.y) {
    throw new Error('The data parameter must have x and y elements');
  } else if (!Array.isArray(data.x) || data.x.length < 2 || !Array.isArray(data.y) || data.y.length < 2) {
    throw new Error('The data parameter elements must be an array with more than 2 points');
  } else if (data.x.length !== data.y.length) {
    throw new Error('The data parameter elements must have the same size');
  }

  var parameters = initialValues || new Array(parameterizedFunction.length).fill(1);
  let parLen = parameters.length;
  maxValues = maxValues || new Array(parLen).fill(Number.MAX_SAFE_INTEGER);
  minValues = minValues || new Array(parLen).fill(Number.MIN_SAFE_INTEGER);

  if (maxValues.length !== minValues.length) {
    throw new Error('minValues and maxValues must be the same size');
  }

  if (!Array.isArray(parameters)) {
    throw new Error('initialValues must be an array');
  }

  var error = errorCalculation(data, parameters, parameterizedFunction);
  var converged = error <= errorTolerance;

  for (var iteration = 0; iteration < maxIterations && !converged; iteration++) {
    parameters = step(data, parameters, damping, gradientDifference, parameterizedFunction);

    for (let k = 0; k < parLen; k++) {
      parameters[k] = Math.min(Math.max(minValues[k], parameters[k]), maxValues[k]);
    }

    error = errorCalculation(data, parameters, parameterizedFunction);
    if (isNaN(error)) break;
    converged = error <= errorTolerance;
  }

  return {
    parameterValues: parameters,
    parameterError: error,
    iterations: iteration
  };
}

/***/ }),
/* 146 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/ml-array-xy-filter-x/src/getZones.js
function getZones(from, to) {
  let exclusions = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

  if (from > to) {
    [from, to] = [to, from];
  } // in exclusions from and to have to be defined


  exclusions = exclusions.filter(exclusion => exclusion.from !== undefined && exclusion.to !== undefined);
  exclusions = JSON.parse(JSON.stringify(exclusions)); // we ensure that from before to

  exclusions.forEach(exclusion => {
    if (exclusion.from > exclusion.to) {
      [exclusion.to, exclusion.from] = [exclusion.from, exclusion.to];
    }
  });
  exclusions.sort((a, b) => a.from - b.from); // we will rework the exclusions in order to remove overlap and outside range (from / to)

  exclusions.forEach(exclusion => {
    if (exclusion.from < from) exclusion.from = from;
    if (exclusion.to > to) exclusion.to = to;
  });

  for (let i = 0; i < exclusions.length - 1; i++) {
    if (exclusions[i].to > exclusions[i + 1].from) {
      exclusions[i].to = exclusions[i + 1].from;
    }
  }

  exclusions = exclusions.filter(exclusion => exclusion.from < exclusion.to);

  if (!exclusions || exclusions.length === 0) {
    return [{
      from,
      to
    }];
  }

  let zones = [];
  let currentFrom = from;

  for (let exclusion of exclusions) {
    if (currentFrom < exclusion.from) {
      zones.push({
        from: currentFrom,
        to: exclusion.from
      });
    }

    currentFrom = exclusion.to;
  }

  if (currentFrom < to) {
    zones.push({
      from: currentFrom,
      to: to
    });
  }

  return zones;
}
// CONCATENATED MODULE: ./node_modules/ml-array-xy-filter-x/src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return filterX; });

/**
 * Filter an array x/y based on various criteria
 * x points are expected to be sorted
 *
 * @param {object} points
 * @param {object} [options={}]
 * @param {array} [options.from]
 * @param {array} [options.to]
 * @param {array} [options.exclusions=[]]
 * @return {{x: Array<number>, y: Array<number>}}
 */

function filterX(points) {
  let options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  const {
    x,
    y
  } = points;
  const {
    from = x[0],
    to = x[x.length - 1],
    exclusions = []
  } = options;
  let zones = getZones(from, to, exclusions);
  let currentZoneIndex = 0;
  let newX = [];
  let newY = [];
  let position = 0;

  while (position < x.length) {
    if (x[position] <= zones[currentZoneIndex].to && x[position] >= zones[currentZoneIndex].from) {
      newX.push(x[position]);
      newY.push(y[position]);
    } else {
      if (x[position] > zones[currentZoneIndex].to) {
        currentZoneIndex++;
        if (!zones[currentZoneIndex]) break;
      }
    }

    position++;
  }

  return {
    x: newX,
    y: newY
  };
}

/***/ }),
/* 147 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/ml-knn/src/KDTree.js
/*
 * Original code from:
 *
 * k-d Tree JavaScript - V 1.01
 *
 * https://github.com/ubilabs/kd-tree-javascript
 *
 * @author Mircea Pricop <pricop@ubilabs.net>, 2012
 * @author Martin Kleppe <kleppe@ubilabs.net>, 2012
 * @author Ubilabs http://ubilabs.net, 2012
 * @license MIT License <http://www.opensource.org/licenses/mit-license.php>
 */
function Node(obj, dimension, parent) {
  this.obj = obj;
  this.left = null;
  this.right = null;
  this.parent = parent;
  this.dimension = dimension;
}

class KDTree {
  constructor(points, metric) {
    // If points is not an array, assume we're loading a pre-built tree
    if (!Array.isArray(points)) {
      this.dimensions = points.dimensions;
      this.root = points;
      restoreParent(this.root);
    } else {
      this.dimensions = new Array(points[0].length);

      for (var i = 0; i < this.dimensions.length; i++) {
        this.dimensions[i] = i;
      }

      this.root = buildTree(points, 0, null, this.dimensions);
    }

    this.metric = metric;
  } // Convert to a JSON serializable structure; this just requires removing
  // the `parent` property


  toJSON() {
    const result = toJSONImpl(this.root, true);
    result.dimensions = this.dimensions;
    return result;
  }

  nearest(point, maxNodes, maxDistance) {
    const metric = this.metric;
    const dimensions = this.dimensions;
    var i;
    const bestNodes = new BinaryHeap(function (e) {
      return -e[1];
    });

    function nearestSearch(node) {
      const dimension = dimensions[node.dimension];
      const ownDistance = metric(point, node.obj);
      const linearPoint = {};
      var bestChild, linearDistance, otherChild, i;

      function saveNode(node, distance) {
        bestNodes.push([node, distance]);

        if (bestNodes.size() > maxNodes) {
          bestNodes.pop();
        }
      }

      for (i = 0; i < dimensions.length; i += 1) {
        if (i === node.dimension) {
          linearPoint[dimensions[i]] = point[dimensions[i]];
        } else {
          linearPoint[dimensions[i]] = node.obj[dimensions[i]];
        }
      }

      linearDistance = metric(linearPoint, node.obj);

      if (node.right === null && node.left === null) {
        if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
          saveNode(node, ownDistance);
        }

        return;
      }

      if (node.right === null) {
        bestChild = node.left;
      } else if (node.left === null) {
        bestChild = node.right;
      } else {
        if (point[dimension] < node.obj[dimension]) {
          bestChild = node.left;
        } else {
          bestChild = node.right;
        }
      }

      nearestSearch(bestChild);

      if (bestNodes.size() < maxNodes || ownDistance < bestNodes.peek()[1]) {
        saveNode(node, ownDistance);
      }

      if (bestNodes.size() < maxNodes || Math.abs(linearDistance) < bestNodes.peek()[1]) {
        if (bestChild === node.left) {
          otherChild = node.right;
        } else {
          otherChild = node.left;
        }

        if (otherChild !== null) {
          nearestSearch(otherChild);
        }
      }
    }

    if (maxDistance) {
      for (i = 0; i < maxNodes; i += 1) {
        bestNodes.push([null, maxDistance]);
      }
    }

    if (this.root) {
      nearestSearch(this.root);
    }

    const result = [];

    for (i = 0; i < Math.min(maxNodes, bestNodes.content.length); i += 1) {
      if (bestNodes.content[i][0]) {
        result.push([bestNodes.content[i][0].obj, bestNodes.content[i][1]]);
      }
    }

    return result;
  }

}

function toJSONImpl(src) {
  const dest = new Node(src.obj, src.dimension, null);
  if (src.left) dest.left = toJSONImpl(src.left);
  if (src.right) dest.right = toJSONImpl(src.right);
  return dest;
}

function buildTree(points, depth, parent, dimensions) {
  const dim = depth % dimensions.length;

  if (points.length === 0) {
    return null;
  }

  if (points.length === 1) {
    return new Node(points[0], dim, parent);
  }

  points.sort((a, b) => a[dimensions[dim]] - b[dimensions[dim]]);
  const median = Math.floor(points.length / 2);
  const node = new Node(points[median], dim, parent);
  node.left = buildTree(points.slice(0, median), depth + 1, node, dimensions);
  node.right = buildTree(points.slice(median + 1), depth + 1, node, dimensions);
  return node;
}

function restoreParent(root) {
  if (root.left) {
    root.left.parent = root;
    restoreParent(root.left);
  }

  if (root.right) {
    root.right.parent = root;
    restoreParent(root.right);
  }
} // Binary heap implementation from:
// http://eloquentjavascript.net/appendix2.html


class BinaryHeap {
  constructor(scoreFunction) {
    this.content = [];
    this.scoreFunction = scoreFunction;
  }

  push(element) {
    // Add the new element to the end of the array.
    this.content.push(element); // Allow it to bubble up.

    this.bubbleUp(this.content.length - 1);
  }

  pop() {
    // Store the first element so we can return it later.
    var result = this.content[0]; // Get the element at the end of the array.

    var end = this.content.pop(); // If there are any elements left, put the end element at the
    // start, and let it sink down.

    if (this.content.length > 0) {
      this.content[0] = end;
      this.sinkDown(0);
    }

    return result;
  }

  peek() {
    return this.content[0];
  }

  size() {
    return this.content.length;
  }

  bubbleUp(n) {
    // Fetch the element that has to be moved.
    var element = this.content[n]; // When at 0, an element can not go up any further.

    while (n > 0) {
      // Compute the parent element's index, and fetch it.
      const parentN = Math.floor((n + 1) / 2) - 1;
      const parent = this.content[parentN]; // Swap the elements if the parent is greater.

      if (this.scoreFunction(element) < this.scoreFunction(parent)) {
        this.content[parentN] = element;
        this.content[n] = parent; // Update 'n' to continue at the new position.

        n = parentN;
      } else {
        // Found a parent that is less, no need to move it further.
        break;
      }
    }
  }

  sinkDown(n) {
    // Look up the target element and its score.
    var length = this.content.length;
    var element = this.content[n];
    var elemScore = this.scoreFunction(element);

    while (true) {
      // Compute the indices of the child elements.
      var child2N = (n + 1) * 2;
      var child1N = child2N - 1; // This is used to store the new position of the element,
      // if any.

      var swap = null; // If the first child exists (is inside the array)...

      if (child1N < length) {
        // Look it up and compute its score.
        var child1 = this.content[child1N];
        var child1Score = this.scoreFunction(child1); // If the score is less than our element's, we need to swap.

        if (child1Score < elemScore) {
          swap = child1N;
        }
      } // Do the same checks for the other child.


      if (child2N < length) {
        var child2 = this.content[child2N];
        var child2Score = this.scoreFunction(child2);

        if (child2Score < (swap === null ? elemScore : child1Score)) {
          swap = child2N;
        }
      } // If the element needs to be moved, swap it, and continue.


      if (swap !== null) {
        this.content[n] = this.content[swap];
        this.content[swap] = element;
        n = swap;
      } else {
        // Otherwise, we are done.
        break;
      }
    }
  }

}
// EXTERNAL MODULE: ./node_modules/ml-distance-euclidean/euclidean.js
var euclidean = __webpack_require__(2);
var euclidean_default = /*#__PURE__*/__webpack_require__.n(euclidean);

// CONCATENATED MODULE: ./node_modules/ml-knn/src/index.js
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return src_KNN; });


class src_KNN {
  /**
   * @param {Array} dataset
   * @param {Array} labels
   * @param {object} options
   * @param {number} [options.k=numberOfClasses + 1] - Number of neighbors to classify.
   * @param {function} [options.distance=euclideanDistance] - Distance function that takes two parameters.
   */
  constructor(dataset, labels) {
    let options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (dataset === true) {
      const model = labels;
      this.kdTree = new KDTree(model.kdTree, options);
      this.k = model.k;
      this.classes = new Set(model.classes);
      this.isEuclidean = model.isEuclidean;
      return;
    }

    const classes = new Set(labels);
    const {
      distance = euclidean_default.a,
      k = classes.size + 1
    } = options;
    const points = new Array(dataset.length);

    for (var i = 0; i < points.length; ++i) {
      points[i] = dataset[i].slice();
    }

    for (i = 0; i < labels.length; ++i) {
      points[i].push(labels[i]);
    }

    this.kdTree = new KDTree(points, distance);
    this.k = k;
    this.classes = classes;
    this.isEuclidean = distance === euclidean_default.a;
  }
  /**
   * Create a new KNN instance with the given model.
   * @param {object} model
   * @param {function} distance=euclideanDistance - distance function must be provided if the model wasn't trained with euclidean distance.
   * @return {KNN}
   */


  static load(model) {
    let distance = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : euclidean_default.a;

    if (model.name !== 'KNN') {
      throw new Error('invalid model: ' + model.name);
    }

    if (!model.isEuclidean && distance === euclidean_default.a) {
      throw new Error('a custom distance function was used to create the model. Please provide it again');
    }

    if (model.isEuclidean && distance !== euclidean_default.a) {
      throw new Error('the model was created with the default distance function. Do not load it with another one');
    }

    return new src_KNN(true, model, distance);
  }
  /**
   * Return a JSON containing the kd-tree model.
   * @return {object} JSON KNN model.
   */


  toJSON() {
    return {
      name: 'KNN',
      kdTree: this.kdTree,
      k: this.k,
      classes: Array.from(this.classes),
      isEuclidean: this.isEuclidean
    };
  }
  /**
   * Predicts the output given the matrix to predict.
   * @param {Array} dataset
   * @return {Array} predictions
   */


  predict(dataset) {
    if (Array.isArray(dataset)) {
      if (typeof dataset[0] === 'number') {
        return getSinglePrediction(this, dataset);
      } else if (Array.isArray(dataset[0]) && typeof dataset[0][0] === 'number') {
        const predictions = new Array(dataset.length);

        for (var i = 0; i < dataset.length; i++) {
          predictions[i] = getSinglePrediction(this, dataset[i]);
        }

        return predictions;
      }
    }

    throw new TypeError('dataset to predict must be an array or a matrix');
  }

}

function getSinglePrediction(knn, currentCase) {
  var nearestPoints = knn.kdTree.nearest(currentCase, knn.k);
  var pointsPerClass = {};
  var predictedClass = -1;
  var maxPoints = -1;
  var lastElement = nearestPoints[0][0].length - 1;

  for (var element of knn.classes) {
    pointsPerClass[element] = 0;
  }

  for (var i = 0; i < nearestPoints.length; ++i) {
    var currentClass = nearestPoints[i][0][lastElement];
    var currentPoints = ++pointsPerClass[currentClass];

    if (currentPoints > maxPoints) {
      predictedClass = currentClass;
      maxPoints = currentPoints;
    }
  }

  return predictedClass;
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=ml.js.map