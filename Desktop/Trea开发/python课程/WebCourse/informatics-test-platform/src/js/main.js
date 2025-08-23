// 延安科创升学网 - 主JavaScript文件

class AuthManager {
    constructor() {
        this.currentUser = null;
        this.init();
    }

    init() {
        this.loadUserFromStorage();
        // 确保DOM加载完成后再更新导航
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => {
                this.updateNavigation();
            });
        } else {
            this.updateNavigation();
        }
    }

    loadUserFromStorage() {
        const userData = localStorage.getItem('currentUser');
        console.log('从存储加载用户数据:', userData);
        if (userData) {
            try {
                this.currentUser = JSON.parse(userData);
                console.log('用户数据解析成功:', this.currentUser);
            } catch (error) {
                console.error('用户数据解析失败:', error);
                this.currentUser = null;
            }
        } else {
            console.log('没有找到用户数据');
            this.currentUser = null;
        }
    }

    saveUser(user) {
        this.currentUser = user;
        localStorage.setItem('currentUser', JSON.stringify(user));
    }

    logout() {
        this.currentUser = null;
        localStorage.removeItem('currentUser');
        localStorage.removeItem('rememberMe');
        localStorage.removeItem('userEmail');
        this.updateNavigation();
    }

    isLoggedIn() {
        return this.currentUser !== null;
    }

    updateNavigation() {
        const navElement = document.getElementById('mainNavigation');
        console.log('更新导航 - 元素:', navElement, '登录状态:', this.isLoggedIn());
        if (!navElement) {
            console.error('导航元素未找到');
            return;
        }

        if (this.isLoggedIn()) {
            // 用户已登录状态
            navElement.innerHTML = `
                <ul class="navbar-nav me-auto">
                    <li class="nav-item">
                        <a class="nav-link active" href="dashboard.html">
                            <i class="fas fa-home me-1"></i>首页
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="problems.html">
                            <i class="fas fa-code me-1"></i>题库
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="tests.html">
                            <i class="fas fa-file-alt me-1"></i>测试
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="results.html">
                            <i class="fas fa-chart-line me-1"></i>成绩
                        </a>
                    </li>
                </ul>
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item dropdown">
                        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown">
                            <i class="fas fa-user-circle me-1"></i>${this.currentUser?.firstName || '用户'}
                        </a>
                        <ul class="dropdown-menu">
                            <li><a class="dropdown-item" href="profile.html">
                                <i class="fas fa-user me-2"></i>个人资料
                            </a></li>
                            <li><a class="dropdown-item" href="settings.html">
                                <i class="fas fa-cog me-2"></i>设置
                            </a></li>
                            <li><hr class="dropdown-divider"></li>
                            <li><a class="dropdown-item" href="#" onclick="authManager.logout()">
                                <i class="fas fa-sign-out-alt me-2"></i>退出登录
                            </a></li>
                        </ul>
                    </li>
                </ul>
            `;
        } else {
            // 用户未登录状态
            navElement.innerHTML = `
                <ul class="navbar-nav ms-auto">
                    <li class="nav-item">
                        <a class="nav-link" href="login.html">登录</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" href="register.html">注册</a>
                    </li>
                </ul>
            `;
        }
    }
}

class FormValidator {
    static init() {
        document.addEventListener('DOMContentLoaded', function() {
            // 启用Bootstrap表单验证
            const forms = document.querySelectorAll('.needs-validation');
            
            Array.from(forms).forEach(form => {
                form.addEventListener('submit', event => {
                    if (!form.checkValidity()) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form.classList.add('was-validated');
                }, false);
            });

            // 实时验证
            document.addEventListener('input', function(event) {
                const input = event.target;
                if (input.classList.contains('form-control')) {
                    FormValidator.validateInput(input);
                }
            });
        });
    }

    static validateInput(input) {
        if (input.checkValidity()) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
        }
    }

    static validatePassword(password, confirmPassword) {
        if (password.value !== confirmPassword.value) {
            confirmPassword.setCustomValidity('两次输入的密码不一致');
        } else {
            confirmPassword.setCustomValidity('');
        }
    }
}

class UIUtils {
    static showLoading(button, text = '处理中...') {
        const originalText = button.innerHTML;
        button.innerHTML = `
            <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
            ${text}
        `;
        button.disabled = true;
        return originalText;
    }

    static hideLoading(button, originalText) {
        button.innerHTML = originalText;
        button.disabled = false;
    }

    static showToast(message, type = 'success') {
        // 简单的toast实现
        const toast = document.createElement('div');
        toast.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        toast.style.cssText = 'top: 20px; right: 20px; z-index: 1050; min-width: 300px;';
        toast.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
        `;
        
        document.body.appendChild(toast);
        
        // 自动消失
        setTimeout(() => {
            if (toast.parentNode) {
                toast.remove();
            }
        }, 3000);
    }

    static formatTime(date) {
        return new Intl.DateTimeFormat('zh-CN', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit'
        }).format(date);
    }
}

// 全局工具函数
const utils = {
    debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },

    throttle(func, limit) {
        let inThrottle;
        return function(...args) {
            if (!inThrottle) {
                func.apply(this, args);
                inThrottle = true;
                setTimeout(() => inThrottle = false, limit);
            }
        };
    },

    getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },

    setQueryParam(name, value) {
        const urlParams = new URLSearchParams(window.location.search);
        urlParams.set(name, value);
        window.history.replaceState({}, '', `${window.location.pathname}?${urlParams}`);
    }
};

// 初始化应用
class App {
    static init() {
        // 初始化表单验证
        FormValidator.init();
        
        // 初始化认证管理器
        window.authManager = new AuthManager();

        // 添加全局错误处理
        window.addEventListener('error', this.handleGlobalError);
        window.addEventListener('unhandledrejection', this.handlePromiseRejection);

        // 初始化页面特定功能
        this.initPageSpecificFeatures();
    }

    static handleGlobalError(event) {
        console.error('全局错误:', event.error);
        UIUtils.showToast('发生错误，请刷新页面重试', 'danger');
    }

    static handlePromiseRejection(event) {
        console.error('Promise拒绝:', event.reason);
        UIUtils.showToast('操作失败，请重试', 'warning');
    }

    static initPageSpecificFeatures() {
        const path = window.location.pathname;
        
        switch(path) {
            case '/login.html':
                this.initLoginPage();
                break;
            case '/register.html':
                this.initRegisterPage();
                break;
            case '/dashboard.html':
                this.initDashboardPage();
                break;
        }
    }

    static initLoginPage() {
        // 密码可见性切换
        const toggleBtn = document.getElementById('togglePassword');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                const passwordInput = document.getElementById('loginPassword');
                const type = passwordInput.type === 'password' ? 'text' : 'password';
                passwordInput.type = type;
                
                const icon = this.querySelector('i');
                icon.classList.toggle('fa-eye');
                icon.classList.toggle('fa-eye-slash');
            });
        }
    }

    static initRegisterPage() {
        // 密码确认验证
        const password = document.getElementById('password');
        const confirmPassword = document.getElementById('confirmPassword');
        
        if (password && confirmPassword) {
            confirmPassword.addEventListener('input', utils.debounce(() => {
                FormValidator.validatePassword(password, confirmPassword);
            }, 300));
        }
    }

    static initDashboardPage() {
        // 仪表板特定初始化
        console.log('仪表板页面初始化');
    }
}

// 页面加载完成后初始化应用
document.addEventListener('DOMContentLoaded', function() {
    try {
        App.init();
        console.log('应用初始化完成');
    } catch (error) {
        console.error('应用初始化失败:', error);
    }
});

// 数据管理器 - 用于页面间数据传递
class DataManager {
    static set(key, data) {
        const dataWithTimestamp = {
            data: data,
            timestamp: Date.now()
        };
        sessionStorage.setItem(key, JSON.stringify(dataWithTimestamp));
    }

    static get(key, maxAge = 300000) { // 默认5分钟有效期
        const item = sessionStorage.getItem(key);
        if (!item) return null;

        try {
            const parsed = JSON.parse(item);
            // 检查数据是否过期
            if (Date.now() - parsed.timestamp > maxAge) {
                this.remove(key);
                return null;
            }
            return parsed.data;
        } catch (error) {
            console.error('数据解析失败:', error);
            return null;
        }
    }

    static remove(key) {
        sessionStorage.removeItem(key);
    }

    static clear() {
        sessionStorage.clear();
    }
}

// 全局对象会在App.init()中初始化
window.UIUtils = UIUtils;
window.utils = utils;
window.DataManager = DataManager;